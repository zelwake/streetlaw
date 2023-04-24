/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Keyword_lesson_category,
  Keyword_material_category,
  Lesson_keyword,
  Material_keyword,
} from '@prisma/client'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { Editor } from 'tinymce'

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

export type DatabaseFormProps = {
  categories: Keyword_lesson_category[] | Keyword_material_category[]
  keywordsList: Lesson_keyword[] | Material_keyword[]
  selected: number
  keywords: Lesson_keyword[] | Material_keyword[]
  addValue: number
  message: string
  fetchKeywordsGroup: (id: number) => Promise<void>
  removeRelation: (id: number, name: string) => Promise<void>
  addRelation: (e: FormEvent) => Promise<void>
  setAddValue: Dispatch<SetStateAction<number>>
}

export type UserRoleForm = {
  email: string
  roleId: number
}

export type ContentEditorRef = Editor | null

export type EditorEvent = {
  readonly type: string
  readonly target: any
  readonly isDefaultPrevented: () => boolean
  readonly preventDefault: () => void
  readonly isPropagationStopped: () => boolean
  readonly stopPropagation: () => void
  readonly isImmediatePropagationStopped: () => boolean
  readonly stopImmediatePropagation: () => void
}
