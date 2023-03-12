import prisma from '@/lib/prisma'
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

  //todo at some point check database if email is already present

  const emailExist = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  })

  if (emailExist) {
    return res.status(400).json({ error: 'Email už je registrován' })
  }

  const { error, success } = validateCredentials(body)

  if (error && !success) {
    return res.status(400).json({ error })
  } else if (!error && success) {
    //todo hash password with bcrypt
    //todo store user in database with verification hash
    //todo send mail with verification link
    return res
      .status(201)
      .json({ message: `Email byl zaslán na adresu ${body.email}` })
  }
}
