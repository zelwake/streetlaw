import prisma from '@/lib/prisma'
import { checkToken } from '@/scripts/api/checkToken'
import { urlFormatter } from '@/scripts/textFormatting/urlFormatter'
import type { NextApiRequest, NextApiResponse } from 'next'

enum PostCategory {
  'news' = 'aktuality',
  'media-coverage' = 'medialni-ohlasy',
}

type NewsType = 'news' | 'media-coverage'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await checkToken(req)

  switch (req.method) {
    case 'POST': {
      const { categoryId, title, text } = req.body

      if (isNaN(categoryId) || !text.trim() || !title.trim())
        return res.status(400).json({ error: 'Missing body' })

      try {
        const category = await prisma.post_category.findUnique({
          where: {
            id: categoryId,
          },
          select: {
            name: true,
          },
        })

        if (!category)
          return res.status(400).json({ error: "Category doesn't exists" })

        const id = urlFormatter(title)

        const categoryName = PostCategory[category.name as NewsType]

        const add = await prisma.post.create({
          data: {
            id,
            title: title.trim(),
            urlPath: `/${categoryName}/${id}`,
            creatorId: token?.sub as string,
            categoryId,
            detail: text,
          },
        })

        return res.status(201).json({
          message: `${process.env.NEXT_PUBLIC_URL}/${add.urlPath}`,
        })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Something went wrong' })
      }
    }

    default:
      return res.status(405).json({ error: 'Not allowed' })
  }
}
