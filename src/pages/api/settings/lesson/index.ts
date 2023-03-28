import prisma from '@/lib/prisma'
import { checkToken } from '@/scripts/api/checkToken'
import {
  settingsLessonDELETEInterface,
  settingsLessonPOSTInterface,
} from '@projectType/apiInterface'
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
      const { category } = req.query

      try {
        if (!category) {
          const categories = await prisma.keyword_lesson_category.findMany()
          return res.status(200).json({ data: categories })
        }

        const categoryData = await prisma.keyword_lesson_category.findFirst({
          where: {
            id: parseInt(category as string),
          },
          include: {
            keywords: {
              select: {
                Keyword: true,
              },
            },
          },
        })

        if (!categoryData) return res.status(404).json({ data: 'Not found' })

        return res.status(200).json({ data: categoryData })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ data: 'Internal server error' })
      }
    }
    case 'POST': {
      const { keyword, category }: settingsLessonPOSTInterface = req.body

      try {
        const addRelation = await prisma.keyword_to_lesson_category.create({
          data: {
            categoryId: category,
            keywordId: keyword,
          },
        })

        return res.status(201).json({ data: addRelation })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ data: 'Internal server error' })
      }
    }
    case 'DELETE': {
      const { keyword, category }: settingsLessonDELETEInterface = req.body

      const relation = {
        categoryId: category,
        keywordId: keyword,
      }

      try {
        const exist = await prisma.keyword_to_lesson_category.findUnique({
          where: {
            keywordId_categoryId: relation,
          },
        })

        if (!exist) return res.status(400).json({ data: 'Bad request' })

        await prisma.keyword_to_lesson_category.delete({
          where: {
            keywordId_categoryId: relation,
          },
        })

        return res.status(200).json({ data: 'Successfully removed' })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ data: 'Internal server error' })
      }
    }
  }

  res.status(405).json({ data: 'Method not allowed' })
}
