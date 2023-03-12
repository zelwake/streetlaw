import { validateCredentials } from '@/scripts/validateCredentials'
import { RegisterType } from '@projectType/authTypes'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

  const { error, success } = validateCredentials(body)

  if (error && !success) {
    return res.status(400).json({ error })
  } else if (!error && success) {
    //todo add user to database with verification hash
    //todo send mail with verification link
    return res
      .status(201)
      .json({ message: `Email byl zaslán na adresu ${body.email}` })
  }
}
