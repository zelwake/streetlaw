import Button from '@/components/Button'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { PasswordsType } from '../SettingsPage/Password'

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
      className="grid grid-cols-5 items-center pl-9 pr-16 my-7 gap-7 relative"
    >
      <label htmlFor="oldPassword" className="password-label">
        Staré heslo
      </label>
      <input
        id="oldPassword"
        type="password"
        className="password-input"
        value={passwords.oldPassword}
        onChange={(e) => {
          setPasswords((prev) => ({
            ...prev,
            oldPassword: e.target.value,
          }))
        }}
      />
      <label htmlFor="newPassword" className="password-label">
        Nové heslo
      </label>
      <input
        id="newPassword"
        type="password"
        className="password-input"
        value={passwords.newPassword}
        onChange={(e) => {
          setPasswords((prev) => ({
            ...prev,
            newPassword: e.target.value,
          }))
        }}
      />
      <Button value="Změnit" className="col-start-5" />
    </form>
  )
}

export default PasswordChange
