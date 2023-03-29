import { Keyword_lesson_category, Lesson_keyword } from '@prisma/client'
import {
  settingsLessonDELETEInterface,
  settingsLessonPOSTInterface,
} from '@projectType/apiInterface'
import { useEffect, useState } from 'react'

const Keywords = () => {
  const categories = useCategoryList()
  const keywordsList = useKeywordsList()

  const [selected, setSelected] = useState<number>(1)
  const [keywords, setKeywords] = useState<Lesson_keyword[]>([])
  const [addValue, setAddValue] = useState<number>(1)

  const fetchKeywordsGroup = async (id: number) => {
    setSelected(id)
    const response = await fetch(`/api/settings/lesson?category=${id}`)
    const body: {
      data: {
        keywords: {
          Keyword: Lesson_keyword
        }[]
      }
    } = await response.json()
    setKeywords(
      body.data.keywords.map((v) => ({
        id: v.Keyword.id,
        word: v.Keyword.word,
      }))
    )
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

  const addRelation = async (e: React.FormEvent) => {
    e.preventDefault()

    const data: settingsLessonPOSTInterface = {
      category: selected,
      keyword: addValue,
    }
    const post = await fetch('/api/settings/lesson', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const json: {
      data: {
        id: number
        word: string
      }
    } = await post.json()
    setKeywords((prev) => [...prev, json.data].sort((a, b) => a.id - b.id))
  }

  if (categories.length) {
    return (
      <div className="flex gap-x-5 p-5">
        <div>
          {categories.map((v) => (
            <p key={v.id} onClick={() => fetchKeywordsGroup(v.id)}>
              {v.word}
            </p>
          ))}
        </div>
        <div>
          {keywords.map((v) => (
            <div key={v.id} className="flex w-80 justify-between">
              <p>{v.word}</p>
              <button onClick={() => removeRelation(v.id)}>Odebrat</button>
            </div>
          ))}
        </div>
        <form onSubmit={addRelation}>
          <select
            value={addValue}
            onChange={(e) => setAddValue(parseInt(e.target.value))}
          >
            {keywordsList.map((v) => (
              <option value={v.id} key={v.id}>
                {v.word}
              </option>
            ))}
          </select>
          <input type="submit" name="addRelation" value="Přidat" />
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

function useKeywordsList() {
  const [keywordsList, setKeywordList] = useState<Lesson_keyword[]>([])

  const fetchKeywordsList = async () => {
    const response = await fetch('/api/settings/lesson/keywords')
    const body: { data: Lesson_keyword[] } = await response.json()
    console.log(body.data)
    setKeywordList(body.data)
  }

  useEffect(() => {
    fetchKeywordsList()
  }, [])

  return keywordsList
}
