import { validateCredentials } from '@/scripts/validateCredentials'
import { registerType } from '@projectType/authTypes'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body: registerType = req.body

  const { error, success } = validateCredentials(body)
}
