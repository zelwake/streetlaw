import prisma from '@/lib/prisma'
import {
  Keyword_material_category,
  Keyword_to_material_category,
  Material_keyword,
} from '@prisma/client'

export async function relationExists(relation: {
  categoryId: number
  keywordId: number
}): Promise<Keyword_to_material_category | null> {
  return await prisma.keyword_to_material_category.findUnique({
    where: {
      keywordId_categoryId: relation,
    },
  })
}

export async function createRelation(relation: {
  categoryId: number
  keywordId: number
}): Promise<{
  Keyword: Material_keyword
}> {
  return await prisma.keyword_to_material_category.create({
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
  await prisma.keyword_to_material_category.delete({
    where: {
      keywordId_categoryId: relation,
    },
  })
}

export async function getCategoryKeywords(category: number): Promise<
  | (Keyword_material_category & {
      keywords: {
        Keyword: Material_keyword
      }[]
    })
  | null
> {
  return await prisma.keyword_material_category.findUnique({
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

export async function getCategoryList(): Promise<Keyword_material_category[]> {
  return await prisma.keyword_material_category.findMany()
}
