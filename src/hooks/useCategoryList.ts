import {
  Keyword_lesson_category,
  Keyword_material_category,
} from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'

type JSONBody = {
  data: Keyword_lesson_category[] | Keyword_material_category[] | string
}
type CategoriesType = Keyword_lesson_category[] | Keyword_material_category[]

export default function useCategoryList(group: 'lessons' | 'materials') {
  const [categories, setCategories] = useState<CategoriesType>([])

  const fetchCategoryList = useCallback(async (): Promise<void> => {
    const response = await fetch(`/api/settings/${group}/categories`)

    const body: JSONBody = await response.json()

    if (typeof body.data !== 'string') setCategories(body.data)
    else alert(body.data)

    console.log(`fetched ${group}`)
  }, [group])

  useEffect(() => {
    fetchCategoryList()
  }, [fetchCategoryList])

  return categories
}
