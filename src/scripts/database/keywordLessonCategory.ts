import prisma from '@/lib/prisma'
import { Keyword_to_lesson_category } from '@prisma/client'

export async function relationExists(relation: {
  categoryId: number
  keywordId: number
}): Promise<Keyword_to_lesson_category | null> {
  return await prisma.keyword_to_lesson_category.findUnique({
    where: {
      keywordId_categoryId: relation,
    },
  })
}

export async function createRelation(relation: {
  categoryId: number
  keywordId: number
}) {
  return await prisma.keyword_to_lesson_category.create({
    data: relation,
    select: {
      Keyword: {
        select: {
          id: true,
          word: true,
        },
      },
    },
  })
}
