import prisma from '@/lib/prisma'
import { isExpired } from '@/scripts/timeDate/expirationTime'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET')
    return res.status(405).json({ error: 'Method not allowed' })

  const { id, token } = req.query

  if (!id || !token) return res.status(204).json({ message: 'No Content' })

  try {
    const result = await prisma.verification.findUnique({
      where: {
        id: id.toString(),
      },
    })

    if (!result) return res.status(400).json({ error: 'Bad request' })

    const { hash, expiration } = result

    const expiredToken = isExpired(expiration)
    if (hash !== token.toString() || expiredToken) {
      if (expiredToken) await removeTokenFromDatabase(id.toString())
      return res.status(498).json({ error: 'Token expired/invalid' })
    }

    const { username, password, firstName, email, lastName } = result

    await prisma.user.create({
      data: {
        username,
        password,
        email,
        firstName,
        lastName,
      },
    })

    await removeTokenFromDatabase(id.toString())

    return res.redirect(307, '/auth/login')
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

async function removeTokenFromDatabase(id: string) {
  await prisma.verification.delete({
    where: {
      id,
    },
  })
}
