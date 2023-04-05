import PasswordChange from '@/components/Forms/PasswordChange'
import { validatePassword } from '@/scripts/validateCredentials'
import { useEffect, useState } from 'react'

export type PasswordsType = {
  oldPassword: string
  newPassword: string
}
const Password = () => {
  const [passwords, setPasswords] = useState<PasswordsType>({
    oldPassword: '',
    newPassword: '',
  })
  const [responseMessage, setResponseMessage] = useState<string>('')

  useEffect(() => {
    setResponseMessage('')
  }, [passwords])

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResponseMessage('')

    const valid = validatePassword(passwords.newPassword)

    if (typeof valid == 'string') return setResponseMessage(valid)

    const response = await fetch('/api/auth/password', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(passwords),
    })

    switch (response.status) {
      case 200:
        setResponseMessage('Heslo bylo úspěšně změněno.')
        break
      case 400:
        setResponseMessage('Heslo není správné.')
        break
      case 401:
        setResponseMessage('K této funkci nemáte přístup.')
        break
      case 500:
      default:
        setResponseMessage('Něco se pokazilo. Opakujte akci později.')
        break
    }
  }

  return (
    <PasswordChange
      changePassword={changePassword}
      passwords={passwords}
      setPasswords={setPasswords}
      message={responseMessage}
    />
  )
}

export default Password
