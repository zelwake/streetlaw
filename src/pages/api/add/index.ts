import prisma from '@/lib/prisma'
import { checkToken } from '@/scripts/api/checkToken'
import { urlFormatter } from '@/scripts/textFormatting/urlFormatter'
import type { NextApiRequest, NextApiResponse } from 'next'

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

        const add = await prisma.post.create({
          data: {
            id,
            title,
            urlPath: `/${category.name}/${id}`,
            creatorId: token?.sub as string,
            categoryId,
            detail: text,
          },
        })

        console.log(add)
        return res.status(201).json({
          message: `${process.env.NEXT_PUBLIC_URL}/${category.name}/${id}`,
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
