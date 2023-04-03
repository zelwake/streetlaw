import prisma from '@/lib/prisma'
import { checkToken } from '@/scripts/api/checkToken'
import { AuthorizationLevel, checkRoleLevel } from '@/scripts/api/rights'
import {
  UpdateFormInterface,
  UserPUTInterface,
} from '@projectType/apiInterface'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserPUTInterface>
) {
  const token = await checkToken(req)

  const authorized = await checkRoleLevel(token, AuthorizationLevel.Member)

  if (!authorized) return res.status(401).json({ data: 'Unauthorized' })

  switch (req.method) {
    case 'PUT':
      const {
        firstName,
        lastName,
        photoUrl,
        description,
      }: UpdateFormInterface = req.body

      if (firstName.trim() || lastName.trim())
        return res.status(400).json({ data: 'Chybí jméno nebo příjmení.' })

      try {
        await prisma.user.update({
          where: {
            id: token?.sub,
          },
          data: {
            firstName,
            lastName,
            photoUrl,
            description,
          },
        })
        return res.status(200).json({ data: 'Změněno.' })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ data: 'Chyba na straně serveru.' })
      }
    default:
      return res.status(405).json({ data: 'Method not allowed' })
  }
}
