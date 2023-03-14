import RegisterFormContainer from '@/components/Container/RegisterFormContainer'
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
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  })

  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const LABEL_STYLE = 'inline-block w-40 mr-4 text-xl'
  const INPUT_STYLE = 'border-b-2 border-black w-80 pl-2 focus:outline-none'
  const DESCRIPTION_STYLE = 'mt-2 text-sm'

  const MIN_PASSWORD_LENGTH = 8
  const MIN_USER_LENGTH = 6

  const postRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (values.username.trim().length < MIN_USER_LENGTH)
      return setErrorMessage('Uživatelské jméno je kratší než 6 znaků')
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
    if (!values.email.trim()) return setErrorMessage('Email je prázdný')

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
            username: '',
          })
          break
      }
    } catch (error) {
      setErrorMessage('Něco se pokazilo, zkuste to prosím znova')
    }
  }

  return (
    <div className="w-[560px] h-full m-auto">
      <form className="mt-10 flex flex-col gap-4">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <RegisterFormContainer>
          <label htmlFor="username" className={LABEL_STYLE}>
            Uživatelské jméno
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={values.username}
            className={INPUT_STYLE}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
            required
          />
          <p className={DESCRIPTION_STYLE}>(alespoň 6 znaků)</p>
        </RegisterFormContainer>
        <RegisterFormContainer>
          <label htmlFor="password" className={LABEL_STYLE}>
            Heslo
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            className={INPUT_STYLE}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
          <p className={DESCRIPTION_STYLE}>
            (alespoň 8 znaků, nejméně jedno malé písmeno, jedno velké písmeno a
            číslice)
          </p>
        </RegisterFormContainer>
        <RegisterFormContainer>
          <label htmlFor="first-name" className={LABEL_STYLE}>
            Jméno
          </label>
          <input
            id="first-name"
            name="first_name"
            type="text"
            value={values.firstName}
            className={INPUT_STYLE}
            onChange={(e) =>
              setValues({ ...values, firstName: e.target.value })
            }
            required
          />
        </RegisterFormContainer>
        <RegisterFormContainer>
          <label htmlFor="last-name" className={LABEL_STYLE}>
            Příjmení
          </label>
          <input
            id="last-name"
            name="last_name"
            type="text"
            value={values.lastName}
            className={INPUT_STYLE}
            onChange={(e) => setValues({ ...values, lastName: e.target.value })}
            required
          />
        </RegisterFormContainer>
        <RegisterFormContainer>
          <label htmlFor="email" className={LABEL_STYLE}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            className={INPUT_STYLE}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />
          <p className={DESCRIPTION_STYLE}>Bude Vám zaslán potvrzovací email</p>
        </RegisterFormContainer>
        <input name="register" type="hidden" defaultValue={'true'} />
        <button
          className="bg-streetlaw-500 text-white text-2xl p-2"
          type="submit"
          onClick={postRegister}
        >
          Sign in
        </button>
      </form>
      {errorMessage && (
        <p className="mt-5 text-2xl text-red-500 text-center">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="mt-5 text-2xl text-center">{successMessage}</p>
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
