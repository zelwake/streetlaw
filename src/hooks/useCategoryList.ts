import { Keyword_lesson_category } from '@prisma/client'
import { useEffect, useState } from 'react'

export default function useCategoryList() {
  const [categories, setCategories] = useState<Keyword_lesson_category[]>([])

  const fetchCategoryList = async (): Promise<void> => {
    const response = await fetch('/api/settings/lesson')
    const body: { data: Keyword_lesson_category[] | string } =
      await response.json()
    if (typeof body.data !== 'string') setCategories(body.data)
  }

  useEffect(() => {
    fetchCategoryList()
  }, [])

  return categories
}
