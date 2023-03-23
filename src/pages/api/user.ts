import {
  UpdateFormInterface,
  UserPUTInterface,
} from '@projectType/apiInterface'
import type { NextApiRequest, NextApiResponse } from 'next'
import { checkToken } from '../../scripts/api/checkToken'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserPUTInterface>
) {
  const token = await checkToken(req)

  if (!token) return res.status(401).json({ data: 'Unauthorized' })

  const {
    email,
    firstName,
    lastName,
    photoUrl,
    description,
  }: UpdateFormInterface = req.body

  console.log(email)

  // TODO validate data

  switch (req.method) {
    case 'PUT':
      return res.status(200).json({ data: 'Success' })
    default:
      return res.status(405).json({ data: 'Method not allowed' })
  }
}
