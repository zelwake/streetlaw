import { Lesson_keyword } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'

export default function useKeywordsList(group: 'lessons' | 'materials') {
  const [keywordsList, setKeywordList] = useState<Lesson_keyword[]>([])

  const fetchKeywordsList = useCallback(async () => {
    const response = await fetch(`/api/settings/${group}/keywords`)
    const body: { data: Lesson_keyword[] } = await response.json()
    setKeywordList(body.data)
  }, [group])

  useEffect(() => {
    fetchKeywordsList()
  }, [fetchKeywordsList])

  return keywordsList
}
