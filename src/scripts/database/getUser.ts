import prisma from '@/lib/prisma'

export enum UserUnique {
  'email' = 'email',
  'id' = 'id',
}

export async function getUser(
  value: string,
  column: UserUnique
): Promise<boolean> {
  const result = await prisma.user.findUnique({
    where: {
      [column]: value,
    },
  })

  return !(result === null)
}
