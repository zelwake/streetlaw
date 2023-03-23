import prisma from '@/lib/prisma'
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

  switch (req.method) {
    case 'PUT':
      const {
        email,
        firstName,
        lastName,
        photoUrl,
        description,
      }: UpdateFormInterface = req.body

      // TODO validate data

      try {
        await prisma.user.update({
          where: {
            id: token.sub,
          },
          data: {
            email,
            firstName,
            lastName,
            photoUrl,
            description,
          },
        })
        return res.status(200).json({ data: 'Změněno.' })
      } catch (error) {
        console.log(error)
        return res.status(200).json({ data: 'Chyba na straně serveru.' })
      }
    default:
      return res.status(405).json({ data: 'Method not allowed' })
  }
}
