import AlertMessage from '@/components/AlertMessage'
import { PasswordsType } from '@/components/SettingsPage/Password'
import SubmitButton from '@/components/SubmitButton'
import { Dispatch, FormEvent, SetStateAction } from 'react'

type PasswordChangeProps = {
  changePassword: (event: FormEvent<HTMLFormElement>) => void
  passwords: PasswordsType
  setPasswords: Dispatch<SetStateAction<PasswordsType>>
  message: string
}

const PasswordChange = ({
  changePassword,
  passwords,
  setPasswords,
  message,
}: PasswordChangeProps) => {
  return (
    <form
      onSubmit={changePassword}
      className="my-8 gap-y-4 flex flex-col relative"
    >
      <label htmlFor="oldPassword" className="password-label">
        <p className="settings-span">Staré heslo</p>
        <input
          id="oldPassword"
          type="password"
          className="settings-input"
          value={passwords.oldPassword}
          onChange={(e) => {
            setPasswords((prev) => ({
              ...prev,
              oldPassword: e.target.value,
            }))
          }}
        />
      </label>
      <label htmlFor="newPassword" className="password-label">
        <p className="settings-span">Nové heslo</p>
        <input
          id="newPassword"
          type="password"
          className="settings-input"
          value={passwords.newPassword}
          onChange={(e) => {
            setPasswords((prev) => ({
              ...prev,
              newPassword: e.target.value,
            }))
          }}
        />
      </label>
      <div className="password-label justify-end">
        <SubmitButton value="Změnit" className="col-start-5" />
      </div>
      <AlertMessage
        message={message}
        className="left-1/2 top-1/3 w-1/2 text-center text-gray-500 text-xl"
      />
    </form>
  )
}

export default PasswordChange
