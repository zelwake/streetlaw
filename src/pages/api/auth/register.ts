import { createTransporter } from '@/lib/nodemailer'
import prisma from '@/lib/prisma'
import { createMailPayload } from '@/scripts/createMailPayload'
import { checkUserInDatabase } from '@/scripts/database/checkUserDatabase'
import { hashedPassword } from '@/scripts/hash/bcrypt'
import { randomHash } from '@/scripts/hash/randomHash'
import { setExpirationDate } from '@/scripts/timeDate/expirationTime'
import { validateCredentials } from '@/scripts/validateCredentials'
import { RegisterType } from '@projectType/authTypes'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' })

  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.lastName
  ) {
    return res.status(400).json({ error: 'Missing parameters' })
  }

  const body: RegisterType = req.body

  try {
    const emailExist = await checkUserInDatabase(body.email, 'email')

    if (emailExist)
      return res.status(400).json({ error: 'Email už je registrován' })

    const { error, success } = validateCredentials(body)

    if (error && !success) {
      return res.status(400).json({ error })
    } else if (!error && success) {
      const passwordHash = await hashedPassword(body.password)
      const emailVerificationHash = randomHash()
      const expirationTime = setExpirationDate()

      const created = await prisma.verification.upsert({
        where: {
          email: body.email,
        },
        update: {
          hash: emailVerificationHash,
          expiration: expirationTime,
          password: passwordHash,
          firstName: body.firstName,
          lastName: body.lastName,
        },
        create: {
          password: passwordHash,
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          hash: emailVerificationHash,
          expiration: expirationTime,
        },
      })

      const transporter = createTransporter()

      const mailData = createMailPayload(
        body.email,
        created.id,
        emailVerificationHash
      )

      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.log(err)
          return res.status(502).json({ error: 'Chyba při odeslání emailu' })
        }
        console.log(info)
        return res
          .status(201)
          .json({ message: `Email byl zaslán na adresu ${body.email}` })
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
