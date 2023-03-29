import { Keyword_lesson_category, Lesson_keyword } from '@prisma/client'

export interface UpdateFormInterface {
  firstName: string
  lastName: string
  photoUrl: string
  description: string
}

export interface UserPUTInterface {
  data: string
}

export interface PasswordInterface {
  oldPassword: string
  newPassword: string
}

export interface PasswordPUTInterface {
  data: string
}

export interface settingsLessonResponse {
  data:
    | (Keyword_lesson_category & {
        keywords: {
          Keyword: Lesson_keyword
        }[]
      })
    | null
}

export interface settingsLessonDELETEInterface {
  keyword: number
}

export interface settingsLessonPOSTInterface {
  keyword: number
}
