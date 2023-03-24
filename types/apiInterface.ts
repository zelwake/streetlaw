export interface UpdateFormInterface {
  email: string
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
