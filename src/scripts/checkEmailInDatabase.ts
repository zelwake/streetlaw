import prisma from '@/lib/prisma'
import { NextApiRequest } from 'next'

export async function checkEmailInDatabase(req: NextApiRequest) {
  return await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  })
}
