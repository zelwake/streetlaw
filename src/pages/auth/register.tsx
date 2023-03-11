import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { getCsrfToken } from 'next-auth/react'
import { useState } from 'react'

export default function Register({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [values, setValues] = useState<{
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
  }>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  })

  const MIN_PASSWORD_LENGTH = 8
  const MIN_USER_LENGTH = 8

  const postRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (values.username.trim().length <= MIN_USER_LENGTH)
      return alert('Uživatelské jméno je kratší než 6 znaků')
    if (values.password.trim().length <= MIN_PASSWORD_LENGTH)
      return alert(`Heslo musí mít alespoň ${MIN_PASSWORD_LENGTH} znaků`)
    if (!values.password.trim().match(/.+\d.+/gi))
      return alert('Heslo neobsahuje číslo')
    if (!values.password.trim().match(/[a-z]/g))
      return alert('Heslo malé písmeno')
    if (!values.password.trim().match(/[A-Z]/g))
      return alert('Heslo velké písmeno')
    if (!values.firstName.trim()) return alert('Jméno je prázdné')
    if (!values.lastName.trim()) return alert('Příjmení je prázdné')
    if (!values.email.trim()) return alert('Email je prázdný')
  }

  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Uživatelské jméno
        <input
          name="username"
          type="text"
          value={values.username}
          onChange={(e) => setValues({ ...values, username: e.target.value })}
          required
        />
      </label>
      <label>
        Heslo
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          required
        />
      </label>
      <label>
        Jméno
        <input
          name="first_name"
          type="text"
          value={values.firstName}
          onChange={(e) => setValues({ ...values, firstName: e.target.value })}
          required
        />
      </label>
      <label>
        Příjmení
        <input
          name="last_name"
          type="text"
          value={values.lastName}
          onChange={(e) => setValues({ ...values, lastName: e.target.value })}
          required
        />
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          required
        />
      </label>
      <input name="register" type="hidden" defaultValue={'true'} />
      <button type="submit" onClick={postRegister}>
        Sign in
      </button>
    </form>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
