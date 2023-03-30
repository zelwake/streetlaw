import prisma from '@/lib/prisma'

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
  return await prisma.user.findMany({
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
