import prisma from '@/lib/prisma'
import {
  Keyword_lesson_category,
  Keyword_to_lesson_category,
  Lesson_keyword,
} from '@prisma/client'

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
}): Promise<{
  Keyword: Lesson_keyword
}> {
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

export async function deleteRelation(relation: {
  categoryId: number
  keywordId: number
}): Promise<void> {
  await prisma.keyword_to_lesson_category.delete({
    where: {
      keywordId_categoryId: relation,
    },
  })
}

export async function getCategoryKeywords(category: number): Promise<
  | (Keyword_lesson_category & {
      keywords: {
        Keyword: Lesson_keyword
      }[]
    })
  | null
> {
  return await prisma.keyword_lesson_category.findUnique({
    where: {
      id: category,
    },
    include: {
      keywords: {
        select: {
          Keyword: true,
        },
      },
    },
  })
}

export async function getCategoryList(): Promise<Keyword_lesson_category[]> {
  return await prisma.keyword_lesson_category.findMany()
}

export async function getKeywordsList(): Promise<Lesson_keyword[]> {
  return await prisma.lesson_keyword.findMany()
}
