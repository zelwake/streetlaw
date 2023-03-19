import RegisterFormContainer from '@/components/Container/RegisterFormContainer'
import { RegisterType } from '@projectType/authTypes'

const Registration = ({
  values,
  setValues,
  csrfToken,
  postRegister,
  errorMessage,
  successMessage,
}: {
  values: RegisterType
  setValues: (
    value: RegisterType | ((prevVar: RegisterType) => RegisterType)
  ) => void
  csrfToken: string | undefined
  postRegister: (e: React.FormEvent) => void
  errorMessage: string
  successMessage: string
}) => {
  const LABEL_STYLE = 'inline-block w-40 mr-4 text-xl'
  const INPUT_STYLE = 'border-b-2 border-black w-80 pl-2 focus:outline-none'
  const DESCRIPTION_STYLE = 'mt-2 text-sm'
  return (
    <div className="w-[560px] h-full m-auto">
      <form className="mt-10 flex flex-col gap-4">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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
          <p className={DESCRIPTION_STYLE}>Slouží k přihlášení</p>
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

export default Registration
