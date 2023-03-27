import PasswordChange from '@/components/Forms/PasswordChange'
import { validatePassword } from '@/scripts/validateCredentials'
import { PasswordPUTInterface } from '@projectType/apiInterface'
import { useState } from 'react'

export type PasswordsType = {
  oldPassword: string
  newPassword: string
}
const Password = () => {
  const [passwords, setPasswords] = useState<PasswordsType>({
    oldPassword: '',
    newPassword: '',
  })

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const valid = validatePassword(passwords.newPassword)

    if (typeof valid == 'string') return alert(valid)

    const response = await fetch('/api/auth/password', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(passwords),
    })
    const body: PasswordPUTInterface = await response.json()

    switch (response.status) {
      case 200:
        alert(body.data)
        break
      case 400:
      case 401:
      case 405:
      case 500:
        alert(body.data)
        break
      default:
        break
    }
  }

  return (
    <PasswordChange
      changePassword={changePassword}
      passwords={passwords}
      setPasswords={setPasswords}
    />
  )
}

export default Password
