import useCategoryList from '@/hooks/useCategoryList'
import useKeywordsList from '@/hooks/useKeywordsList'
import { Lesson_keyword } from '@prisma/client'
import {
  settingsDatabaseDELETEInterface,
  settingsDatabasePOSTInterface,
} from '@projectType/apiInterface'
import { useState } from 'react'
import DatabaseForm from '../Forms/DatabaseForm'

const Keywords = () => {
  const [group, setGroup] = useState<'lessons' | 'materials'>('lessons')
  const [selected, setSelected] = useState<number>(0)
  const [keywords, setKeywords] = useState<Lesson_keyword[]>([])
  const [addValue, setAddValue] = useState<number>(0)

  const categories = useCategoryList(group)
  const keywordsList = useKeywordsList(group)

  const fetchKeywordsGroup = async (id: number) => {
    setSelected(id)
    try {
      const response = await fetch(`/api/settings/${group}/categories/${id}`)
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
            body.data.keywords
              .map((v) => ({
                id: v.Keyword.id,
                word: v.Keyword.word,
              }))
              .sort((a, b) => a.word.localeCompare(b.word))
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
    const data: settingsDatabaseDELETEInterface = {
      keyword: id,
    }

    try {
      const send = await fetch(
        `/api/settings/${group}/categories/${selected}`,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

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

    const data: settingsDatabasePOSTInterface = {
      keyword: addValue,
    }
    try {
      const post = await fetch(
        `/api/settings/${group}/categories/${selected}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

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
            [...prev, (json as jsonData).data].sort((a, b) =>
              a.word.localeCompare(b.word)
            )
          )

          break
        case 400:
          alert('Klíčové slovo už existuje')
          break
        case 500:
        default:
          alert('Něco se pokazilo. Opakujte akci později.')
          break
      }
    } catch (error) {
      alert('Něco se pokazilo. Opakujte akci později.')
    }
  }

  if (categories.length) {
    return (
      <div className="p-5">
        <section className="grid grid-cols-2 mb-5">
          <h1
            className={`text-4xl cursor-pointer w-fit ${
              group == 'lessons' && 'font-bold'
            }`}
            onClick={() => {
              setGroup('lessons')
              setSelected(0)
              setKeywords([])
            }}
          >
            Lekce
          </h1>
          <h1
            className={`text-4xl cursor-pointer w-fit ${
              group == 'materials' && 'font-bold'
            }`}
            onClick={() => {
              setGroup('materials')
              setSelected(0)
              setKeywords([])
            }}
          >
            Materiály
          </h1>
        </section>
        <DatabaseForm
          addRelation={addRelation}
          addValue={addValue}
          categories={categories}
          fetchKeywordsGroup={fetchKeywordsGroup}
          keywords={keywords}
          keywordsList={keywordsList}
          removeRelation={removeRelation}
          selected={selected}
          setAddValue={setAddValue}
        />
      </div>
    )
  }
  return <h1>Nemáte přístup k této funkci</h1>
}

export default Keywords
