import prisma from '@/lib/prisma'

export async function updatePassword(id: string, hashed: string) {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hashed,
    },
  })
}

export async function getUserPasswordHash(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      password: true,
    },
  })
}
