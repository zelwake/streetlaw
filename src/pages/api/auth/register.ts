import prisma from '@/lib/prisma'
import { checkUserInDatabase } from '@/scripts/checkUserDatabase'
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

  try {
    const emailExist = await checkUserInDatabase(req.body.email, 'email')

    if (emailExist) {
      return res.status(400).json({ error: 'Email už je registrován' })
    }

    //todo check username for duplicity
    const usernameExist = await checkUserInDatabase(
      req.body.username,
      'username'
    )

    if (usernameExist) {
      return res.status(400).json({ error: 'Uživatelské jméno už existuje' })
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' })
  }

  const { error, success } = validateCredentials(body)

  if (error && !success) {
    return res.status(400).json({ error })
  } else if (!error && success) {
    const passwordHash = await hashedPassword(req.body.password)
    const emailVerificationHash = randomHash()
    const expirationTime = setExpirationDate()

    try {
      await prisma.verification.create({
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
      //todo send mail with verification link
      return res
        .status(201)
        .json({ message: `Email byl zaslán na adresu ${body.email}` })
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
