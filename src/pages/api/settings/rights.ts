import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //TODO get list of users with their rights who are level 3 or lower
  //? group them by level
  //TODO modify selected user rights
  //? delete users?

  const { method } = req

  switch (method) {
    case 'GET': {
      try {
        const usersAndRoles = await prisma.user.findMany({
          where: {
            roleId: {
              lte: 3,
            },
          },
          orderBy: {
            roleId: 'asc',
          },
          select: {
            email: true,
            roleId: true,
            role: {
              select: {
                name: true,
              },
            },
          },
        })

        return res.status(200).json({ data: usersAndRoles })
      } catch (error) {
        return res.status(500).json({ data: 'Internal server error' })
      }
    }
    case 'PATCH': {
      const {
        email,
        roleId,
      }: {
        email: string
        roleId: number
      } = req.body

      if (
        !email ||
        !roleId ||
        typeof email != 'string' ||
        typeof roleId != 'number'
      )
        return res.status(400).json({ data: 'Bad request' })

      const updateRole = await prisma.user.update({
        where: {
          email,
        },
        data: {
          roleId,
        },
        select: {
          email: true,
          roleId: true,
          role: {
            select: {
              name: true,
            },
          },
        },
      })

      return res.status(200).json({ data: updateRole })
    }

    default:
      break
  }

  res.end()
}
