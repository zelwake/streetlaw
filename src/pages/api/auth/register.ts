import { validateCredentials } from '@/scripts/validateCredentials'
import { RegisterType } from '@projectType/authTypes'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body: RegisterType = req.body

  const { error, success } = validateCredentials(body)
}
