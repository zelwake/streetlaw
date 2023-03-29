import useCategoryList from '@/hooks/useCategoryList'
import useKeywordsList from '@/hooks/useKeywordsList'
import { Lesson_keyword } from '@prisma/client'
import {
  settingsLessonDELETEInterface,
  settingsLessonPOSTInterface,
} from '@projectType/apiInterface'
import { useState } from 'react'

const Keywords = () => {
  const categories = useCategoryList()
  const keywordsList = useKeywordsList()

  const [selected, setSelected] = useState<number>(0)
  const [keywords, setKeywords] = useState<Lesson_keyword[]>([])
  const [addValue, setAddValue] = useState<number>(1)

  const fetchKeywordsGroup = async (id: number) => {
    setSelected(id)
    try {
      const response = await fetch(`/api/settings/lessons/categories/${id}`)
      switch (response.status) {
        case 200: {
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
          break
        }
        case 404: {
          return alert('Neexistuje')
        }
        case 500:
        default: {
          return alert('Něco se pokazilo. Opakujte akci později.')
        }
      }
    } catch (error) {
      return alert('Něco se pokazilo. Opakujte akci později.')
    }
  }

  const removeRelation = async (id: number) => {
    const data: settingsLessonDELETEInterface = {
      keyword: id,
    }

    try {
      const send = await fetch(`/api/settings/lessons/categories/${selected}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      switch (send.status) {
        case 200:
          return setKeywords((prev) => prev.filter((v) => v.id != id))
        case 400:
          return alert('Chybně zadaný požadavek.')
        case 500:
        default:
          return alert('Něco se pokazilo. Opakujte akci později.')
      }
    } catch (error) {
      return alert('Něco se pokazilo. Opakujte akci později.')
    }
  }

  const addRelation = async (e: React.FormEvent) => {
    e.preventDefault()

    const data: settingsLessonPOSTInterface = {
      keyword: addValue,
    }
    try {
      const post = await fetch(`/api/settings/lessons/categories/${selected}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const json: {
        data:
          | {
              id: number
              word: string
            }
          | string
      } = await post.json()

      switch (post.status) {
        case 201:
          type jsonData = {
            data: {
              id: number
              word: string
            }
          }
          setKeywords((prev) =>
            [...prev, (json as jsonData).data].sort((a, b) => a.id - b.id)
          )

          break

        default:
          break
      }
    } catch (error) {}
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
        {selected != 0 && (
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
        )}
      </div>
    )
  }
  return <h1>Nemáte přístup k této funkci</h1>
}

export default Keywords
