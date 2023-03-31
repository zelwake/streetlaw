import { checkToken } from '@/scripts/api/checkToken'
import { checkRoleLevel } from '@/scripts/api/rights'
import {
  getUsersRoleList,
  updateUserRole,
} from '@/scripts/database/getUserRole'
import { PatchUserRoleRequest } from '@projectType/apiInterface'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await checkToken(req)
  const ADMIN_LEVEL = 4

  const authorized = await checkRoleLevel(token, ADMIN_LEVEL)

  if (!authorized) return res.status(401).json({ data: 'Unauthorized' })

  const { method } = req

  switch (method) {
    case 'GET': {
      try {
        const usersAndRoles = await getUsersRoleList()

        return res.status(200).json({ data: usersAndRoles })
      } catch (error) {
        return res.status(500).json({ data: 'Internal server error' })
      }
    }
    case 'PATCH': {
      const { email, roleId }: PatchUserRoleRequest = req.body

      if (!email || !roleId)
        return res.status(400).json({ data: 'Bad request' })

      try {
        const updateRole = await updateUserRole(email, roleId)

        return res.status(200).json({ data: updateRole })
      } catch (error) {
        return res.status(500).json({ data: 'Internal server error' })
      }
    }

    default:
      return res.status(405).json({ data: 'Method not allowed' })
  }
}
