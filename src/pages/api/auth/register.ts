import prisma from '@/lib/prisma'
import { hashedPassword } from '@/scripts/hash/bcrypt'
import { setExpirationDate } from '@/scripts/timeDate/expirationTime'
import { validateCredentials } from '@/scripts/validateCredentials'
import { RegisterType } from '@projectType/authTypes'
import { NextApiRequest, NextApiResponse } from 'next'
import { checkEmailInDatabase } from '../../../scripts/checkEmailInDatabase'
import { randomHash } from '../../../scripts/hash/randomHash'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

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

  //todo at some point check database if email is already present

  const emailExist = await checkEmailInDatabase(req)

  if (emailExist) {
    return res.status(400).json({ error: 'Email už je registrován' })
  }

  const { error, success } = validateCredentials(body)

  if (error && !success) {
    return res.status(400).json({ error })
  } else if (!error && success) {
    const passwordHash = await hashedPassword(req.body.password)
    const emailVerificationHash = randomHash()
    const expirationTime = setExpirationDate()

    await prisma.user.create({
      data: {
        username: req.body.username,
        password: passwordHash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        Verification: {
          create: {
            hash: emailVerificationHash,
            expiration: expirationTime,
          },
        },
      },
    })
    //todo send mail with verification link
    return res
      .status(201)
      .json({ message: `Email byl zaslán na adresu ${body.email}` })
  }
}
