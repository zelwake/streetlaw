import { checkToken } from '@/scripts/api/checkToken'
import { getCategoryList } from '@/scripts/database/keywordLessonsCategory'
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
        const categories = await getCategoryList()
        return res.status(200).json({ data: categories })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ data: 'Internal server error' })
      }
    }
    default:
      return res.status(405).json({ data: 'Method not allowed' })
  }
}
