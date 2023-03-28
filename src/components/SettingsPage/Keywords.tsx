import { Keyword_lesson_category, Lesson_keyword } from '@prisma/client'
import { useEffect, useState } from 'react'

const Keywords = () => {
  const categories = useCategoryList()

  const [selected, setSelected] = useState<number>(1)
  const [keywords, setKeywords] = useState<{ Keyword: Lesson_keyword }[]>([])

  const fetchKeywords = async (id: number) => {
    setSelected(id)
    const response = await fetch(`/api/settings/lesson?category=${id}`)
    const body: {
      data: {
        keywords: {
          Keyword: Lesson_keyword
        }[]
      }
    } = await response.json()
    setKeywords(body.data.keywords)
  }

  if (categories.length) {
    return (
      <div className="flex gap-x-5">
        <div>
          {categories.map((v) => (
            <p key={v.id} onClick={() => fetchKeywords(v.id)}>
              {v.word}
            </p>
          ))}
        </div>
        <div>
          {keywords.map((v) => (
            <p key={v.Keyword.id}>{v.Keyword.word}</p>
          ))}
        </div>
      </div>
    )
  }
  return <h1>Nemáte přístup k této funkci</h1>
}

export default Keywords

function useCategoryList() {
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
