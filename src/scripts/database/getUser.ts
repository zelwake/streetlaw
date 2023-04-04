import prisma from '@/lib/prisma'

export async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      firstName: true,
      lastName: true,
      description: true,
      photoUrl: true,
      roleId: true,
    },
  })
}
