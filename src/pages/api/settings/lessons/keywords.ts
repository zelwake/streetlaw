import prisma from '@/lib/prisma'
import { checkToken } from '@/scripts/api/checkToken'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await checkToken(req)

  if (!token || token.roleId < 3)
    return res.status(401).json({ data: 'Unauthorized' })

  const { method } = req

  switch (method) {
    case 'GET': {
      try {
        const keywordsData = await prisma.lesson_keyword.findMany()
        return res.status(200).json({ data: keywordsData })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ data: 'Internal server error' })
      }
    }
    default:
      res.status(405).json({ data: 'Method not allowed' })
  }
}
