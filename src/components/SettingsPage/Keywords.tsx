import { Keyword_lesson_category, Lesson_keyword } from '@prisma/client'
import { settingsLessonDELETEInterface } from '@projectType/apiInterface'
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

  const removeRelation = async (id: number) => {
    const data: settingsLessonDELETEInterface = {
      category: selected,
      keyword: id,
    }

    const send = await fetch('url', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }
  if (categories.length) {
    return (
      <div className="flex gap-x-5 p-5">
        <div>
          {categories.map((v) => (
            <p key={v.id} onClick={() => fetchKeywords(v.id)}>
              {v.word}
            </p>
          ))}
        </div>
        <div>
          {keywords.map((v) => (
            <div key={v.Keyword.id} className="flex w-80 justify-between">
              <p>{v.Keyword.word}</p>
              <button onClick={() => removeRelation(v.Keyword.id)}>
                Odebrat
              </button>
            </div>
          ))}
        </div>
        <form>
          <select name="keyword" id="">
            Ahoj
          </select>
        </form>
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
