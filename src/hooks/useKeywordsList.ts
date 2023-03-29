import { Lesson_keyword } from '@prisma/client'
import { useEffect, useState } from 'react'

export default function useKeywordsList() {
  const [keywordsList, setKeywordList] = useState<Lesson_keyword[]>([])

  const fetchKeywordsList = async () => {
    const response = await fetch('/api/settings/lessons/keywords')
    const body: { data: Lesson_keyword[] } = await response.json()
    setKeywordList(body.data)
  }

  useEffect(() => {
    fetchKeywordsList()
  }, [])

  return keywordsList
}
