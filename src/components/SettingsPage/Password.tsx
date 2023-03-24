import Button from '@/components/Button'
import { PasswordPUTInterface } from '@projectType/apiInterface'
import { useState } from 'react'

export type PasswordsType = {
  oldPassword: string
  newPassword: string
}
const Password = () => {
  // TODO create form to update password
  // should have previous password
  // new password
  // validate new password
  // send to api path, where it will check old password and store new password

  const [passwords, setPasswords] = useState<PasswordsType>({
    oldPassword: '',
    newPassword: '',
  })

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
    <form onSubmit={changePassword}>
      <label htmlFor="oldPassword">Staré heslo</label>
      <input
        id="oldPassword"
        type="password"
        value={passwords.oldPassword}
        onChange={(e) => {
          setPasswords((prev) => ({
            ...prev,
            oldPassword: e.target.value,
          }))
        }}
      />
      <label htmlFor="newPassword">Nové heslo</label>
      <input
        id="newPassword"
        type="password"
        value={passwords.newPassword}
        onChange={(e) => {
          setPasswords((prev) => ({
            ...prev,
            newPassword: e.target.value,
          }))
        }}
      />
      <Button value="Změnit" />
    </form>
  )
}

export default Password
