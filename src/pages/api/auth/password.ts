import prisma from '@/lib/prisma'
import { checkToken } from '@/scripts/api/checkToken'
import { comparePasswordHash, hashedPassword } from '@/scripts/hash/bcrypt'
import { validatePassword } from '@/scripts/validateCredentials'
import { PasswordInterface } from '@projectType/apiInterface'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: string }>
) {
  const token = await checkToken(req)

  if (!token) return res.status(401).json({ data: 'Unauthorized' })

  if (req.method === 'PUT') {
    const { oldPassword, newPassword }: PasswordInterface = req.body

    if (!oldPassword.trim() || !newPassword.trim())
      return res.status(400).json({ data: 'Missing information' })

    try {
      const userPassword = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
        select: {
          password: true,
        },
      })
      if (!userPassword)
        return res.status(400).json({ data: 'Wrong credentials' })

      const rightPassword = comparePasswordHash(
        oldPassword,
        userPassword.password
      )
      if (!rightPassword)
        return res.status(400).json({ data: 'Wrong credentials' })

      const valid = validatePassword(newPassword)
      if (valid) return res.status(400).json({ data: valid })

      const hashed = await hashedPassword(newPassword)

      await prisma.user.update({
        where: {
          id: token.sub,
        },
        data: {
          password: hashed,
        },
      })
      res.status(200).json({ data: 'Password changed' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ data: 'Internal server error' })
    }
  }

  return res.status(405).json({ data: 'Method not allowed' })
}
