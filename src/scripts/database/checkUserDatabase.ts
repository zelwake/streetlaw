import prisma from '@/lib/prisma'

export async function checkUserInDatabase(
  value: string,
  column: 'email' | 'username'
): Promise<boolean> {
  const result = await prisma.user.findUnique({
    where: {
      [column]: value,
    },
  })

  return !(result === null)
}
