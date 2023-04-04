import prisma from '@/lib/prisma'

export enum UserUnique {
  'email' = 'email',
  'id' = 'id',
}

export async function userExist(
  constraint: UserUnique,
  value: string
): Promise<boolean> {
  const result = await prisma.user.findUnique({
    where: {
      [constraint]: value,
    },
  })

  return !(result === null)
}
