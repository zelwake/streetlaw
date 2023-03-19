import prisma from '@/lib/prisma'

export async function checkVerificationDatabase(
  value: string,
  column: 'email' | 'username'
): Promise<boolean> {
  let where = {}

  switch (column) {
    case 'email':
      where = { email: value }
      break
    case 'username':
      where = { username: value }
  }

  const result = await prisma.verification.findUnique({
    where,
  })

  return !(result === null)
}
