import { PasswordsType } from '@/components/SettingsPage/Password'
import SubmitButton from '@/components/SubmitButton'
import { Dispatch, FormEvent, SetStateAction } from 'react'

const PasswordChange = ({
  changePassword,
  passwords,
  setPasswords,
}: {
  changePassword: (event: FormEvent<HTMLFormElement>) => void
  passwords: PasswordsType
  setPasswords: Dispatch<SetStateAction<PasswordsType>>
}) => {
  return (
    <form
      onSubmit={changePassword}
      className="my-8 gap-y-4 flex flex-col relative"
    >
      <label htmlFor="oldPassword" className="profile-label">
        <p className="profile-span">Staré heslo</p>
        <input
          id="oldPassword"
          type="password"
          className="profile-input"
          value={passwords.oldPassword}
          onChange={(e) => {
            setPasswords((prev) => ({
              ...prev,
              oldPassword: e.target.value,
            }))
          }}
        />
      </label>
      <label htmlFor="newPassword" className="profile-label">
        <p className="profile-span">Nové heslo</p>
        <input
          id="newPassword"
          type="password"
          className="profile-input"
          value={passwords.newPassword}
          onChange={(e) => {
            setPasswords((prev) => ({
              ...prev,
              newPassword: e.target.value,
            }))
          }}
        />
      </label>
      <SubmitButton value="Změnit" className="col-start-5" />
    </form>
  )
}

export default PasswordChange
