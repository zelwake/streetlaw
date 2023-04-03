import { checkToken } from '@/scripts/api/checkToken'
import { AuthorizationLevel, checkRoleLevel } from '@/scripts/api/rights'
import { getKeywordsList } from '@/scripts/database/keywordMaterialsCategory'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await checkToken(req)

  const authorized = await checkRoleLevel(token, AuthorizationLevel.Editor)

  if (!authorized) return res.status(401).json({ data: 'Unauthorized' })

  const { method } = req

  switch (method) {
    case 'GET': {
      try {
        const keywordsData = await getKeywordsList()
        return res.status(200).json({ data: keywordsData })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ data: 'Internal server error' })
      }
    }
    default:
      return res.status(405).json({ data: 'Method not allowed' })
  }
}
