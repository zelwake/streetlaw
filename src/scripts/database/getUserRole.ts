import prisma from '@/lib/prisma'
import { serializeUserRoleList } from '../api/rights'

export async function getUserRoleId(id: string): Promise<number | null> {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      roleId: true,
    },
  })

  return user ? user.roleId : null
}

export async function getUsersRoleList() {
  const userRoleList = await prisma.user.findMany({
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

  return serializeUserRoleList(userRoleList)
}

export async function updateUserRole(email: string, roleId: number) {
  return await prisma.user.update({
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
}
