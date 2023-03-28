import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET': {
      const { category } = req.query

      if (!category) return res.status(400).json({ data: 'Bad request' })

      try {
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
      const { keyword, category }: { keyword: number; category: number } =
        req.body

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
  }

  res.status(405).json({ data: 'Method not allowed' })
}
