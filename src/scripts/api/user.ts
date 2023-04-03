import prisma from '@/lib/prisma'

export async function updateUserInfo(
  id: string,
  firstName: string,
  lastName: string,
  photoUrl: string,
  description: string
) {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
      photoUrl,
      description,
    },
  })
}
