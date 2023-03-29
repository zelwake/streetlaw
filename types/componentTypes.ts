export type NewsType = {
  date: string
  title: string
  abstract: string
}

export type LinkListType = {
  name: string
  link: string
}

export type SubmenuType = {
  name: string
  slug: string
}[]

import { Keyword_lesson_category, Lesson_keyword } from '@prisma/client'
import { Dispatch, FormEvent, SetStateAction } from 'react'

export type LessonFormType = {
  categories: Keyword_lesson_category[]
  keywordsList: Lesson_keyword[]
  selected: number
  keywords: Lesson_keyword[]
  addValue: number
  fetchKeywordsGroup: (id: number) => Promise<void>
  removeRelation: (id: number) => Promise<void>
  addRelation: (e: FormEvent) => Promise<void>
  setAddValue: Dispatch<SetStateAction<number>>
}
