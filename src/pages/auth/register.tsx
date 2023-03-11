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

  const postRegister = (e: React.FormEvent) => {
    e.preventDefault()
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
