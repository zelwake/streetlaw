import {
  Keyword_lesson_category,
  Keyword_material_category,
  Lesson_keyword,
  Material_keyword,
} from '@prisma/client'
import { Dispatch, FormEvent, SetStateAction } from 'react'

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

export type DatabaseFormType = {
  categories: Keyword_lesson_category[] | Keyword_material_category[]
  keywordsList: Lesson_keyword[] | Material_keyword[]
  selected: number
  keywords: Lesson_keyword[] | Material_keyword[]
  addValue: number
  fetchKeywordsGroup: (id: number) => Promise<void>
  removeRelation: (id: number) => Promise<void>
  addRelation: (e: FormEvent) => Promise<void>
  setAddValue: Dispatch<SetStateAction<number>>
}

export type UserRoleForm = {
  email: string
  roleId: number
}
