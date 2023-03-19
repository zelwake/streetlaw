import Registration from '@/components/Forms/Registration'
import { RegisterType } from '@projectType/authTypes'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { getCsrfToken } from 'next-auth/react'
import { useState } from 'react'

export default function Register({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [values, setValues] = useState<RegisterType>({
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  })

  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const MIN_PASSWORD_LENGTH = 8

  const postRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!values.email.trim()) return setErrorMessage('Email je prázdný')
    if (values.password.trim().length < MIN_PASSWORD_LENGTH)
      return setErrorMessage(
        `Heslo musí mít alespoň ${MIN_PASSWORD_LENGTH} znaků`
      )
    if (!values.password.trim().match(/\d/))
      return setErrorMessage('Heslo neobsahuje číslo')
    if (!values.password.trim().match(/[a-z]/g))
      return setErrorMessage('Heslo nemá malé písmeno')
    if (!values.password.trim().match(/[A-Z]/g))
      return setErrorMessage('Heslo nemá velké písmeno')
    if (!values.firstName.trim()) return setErrorMessage('Jméno je prázdné')
    if (!values.lastName.trim()) return setErrorMessage('Příjmení je prázdné')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()
      switch (response.status) {
        case 400:
        case 500:
        case 502:
          setErrorMessage(data.error)
          break
        case 201:
          setSuccessMessage(data.message)
          setValues({
            email: '',
            firstName: '',
            lastName: '',
            password: '',
          })
          break
      }
    } catch (error) {
      setErrorMessage('Něco se pokazilo, zkuste to prosím znova')
    }
  }

  return (
    <Registration
      csrfToken={csrfToken}
      errorMessage={errorMessage}
      successMessage={successMessage}
      postRegister={postRegister}
      setValues={setValues}
      values={values}
    />
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
