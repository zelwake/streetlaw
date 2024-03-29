import { checkToken } from '@/scripts/api/checkToken'
import { AuthorizationLevel, checkRoleLevel } from '@/scripts/api/rights'
import {
  createRelation,
  deleteRelation,
  getCategoryKeywords,
  relationExists,
} from '@/scripts/database/keywordLessonsCategory'
import {
  settingsDatabaseDELETEInterface,
  settingsDatabasePOSTInterface,
} from '@projectType/apiInterface'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await checkToken(req)

  const authorized = await checkRoleLevel(token, AuthorizationLevel.Editor)

  if (!authorized) return res.status(401).json({ data: 'Unauthorized' })

  const { method } = req
  const { id } = req.query
  const categoryId: number = id ? Number(id.toString()) : 0

  switch (method) {
    case 'GET': {
      try {
        const categoryData = await getCategoryKeywords(categoryId)
        if (!categoryData) return res.status(404).json({ data: 'Not found' })

        return res.status(200).json({ data: categoryData })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ data: 'Internal server error' })
      }
    }
    case 'POST': {
      const { keyword }: settingsDatabasePOSTInterface = req.body

      const relation = {
        categoryId,
        keywordId: keyword,
      }

      try {
        const exist = await relationExists(relation)
        if (exist) return res.status(400).json({ data: 'Bad request' })

        const addRelation = await createRelation(relation)
        return res.status(201).json({ data: addRelation.Keyword })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ data: 'Internal server error' })
      }
    }
    case 'DELETE': {
      const { keyword }: settingsDatabaseDELETEInterface = req.body

      const relation = {
        categoryId,
        keywordId: keyword,
      }

      try {
        const exist = await relationExists(relation)
        if (!exist) return res.status(400).json({ data: 'Bad request' })

        await deleteRelation(relation)
        return res.status(200).json({ data: 'Successfully removed' })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ data: 'Internal server error' })
      }
    }
    default:
      return res.status(405).json({ data: 'Method not allowed' })
  }
}
