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
