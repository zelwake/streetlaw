import { createTransporter } from '@/lib/nodemailer'
import prisma from '@/lib/prisma'
import { createMailPayload } from '@/scripts/createMailPayload'
import { checkUserInDatabase } from '@/scripts/database/checkUserDatabase'
import { checkVerificationDatabase } from '@/scripts/database/checkVerificationDatabase'
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
    !req.body.username ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.lastName
  ) {
    return res.status(400).json({ error: 'Missing parameters' })
  }

  const body: RegisterType = req.body

  try {
    const emailExist = await checkUserInDatabase(req.body.email, 'email')
    const emailVerification = await checkVerificationDatabase(
      req.body.email,
      'email'
    )

    if (emailExist || emailVerification)
      return res.status(400).json({ error: 'Email už je registrován' })

    const usernameExist = await checkUserInDatabase(
      req.body.username,
      'username'
    )
    const usernameVerification = await checkVerificationDatabase(
      req.body.username,
      'username'
    )

    if (usernameExist || usernameVerification)
      return res.status(400).json({ error: 'Uživatelské jméno už existuje' })

    const { error, success } = validateCredentials(body)

    if (error && !success) {
      return res.status(400).json({ error })
    } else if (!error && success) {
      const passwordHash = await hashedPassword(req.body.password)
      const emailVerificationHash = randomHash()
      const expirationTime = setExpirationDate()

      const created = await prisma.verification.create({
        data: {
          username: req.body.username,
          password: passwordHash,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          hash: emailVerificationHash,
          expiration: expirationTime,
        },
      })

      const transporter = createTransporter()

      const mailData = createMailPayload(
        req.body.email,
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
