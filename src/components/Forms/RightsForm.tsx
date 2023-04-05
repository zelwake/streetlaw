import { SerializedUserRoleList } from '@/scripts/api/rights'
import { UserRoleForm } from '@projectType/componentTypes'
import { Dispatch, SetStateAction } from 'react'
import AlertMessage from '../AlertMessage'
import SubmitButton from '../SubmitButton'

const RightsForm = ({
  userList,
  setUserRoleForm,
  userRoleForm,
  updateRole,
  updateMessage,
}: {
  userList: SerializedUserRoleList
  setUserRoleForm: Dispatch<SetStateAction<UserRoleForm>>
  userRoleForm: UserRoleForm
  updateRole: (e: React.FormEvent) => Promise<void>
  updateMessage: string
}) => {
  const roles = ['Uživatel', 'Člen', 'Editor']
  return (
    <div className="p-5 flex gap-x-10">
      <section className="h-96 w-7/12 overflow-y-scroll">
        {userList.map((group) => (
          <div key={group.id} className="flex mb-4 border-t-4">
            <h2 className="w-36 text-lg font-semibold">
              {roles[group.id - 1]}
            </h2>
            <ul className="border-l-4 w-full">
              {group.users.length ? (
                group.users.map((user) => (
                  <li
                    key={user.email}
                    onClick={() =>
                      setUserRoleForm({
                        email: user.email,
                        roleId: user.roleId,
                      })
                    }
                    className="py-1 cursor-pointer px-2 hover:bg-streetlaw-500 hover:text-white"
                  >
                    {user.email}
                  </li>
                ))
              ) : (
                <li>Zde nikdo není</li>
              )}
            </ul>
          </div>
        ))}
      </section>
      {userRoleForm.roleId != 0 && (
        <form
          onSubmit={updateRole}
          className="flex flex-col gap-6 items-center justify-center grow relative"
        >
          <label className="text-lg uppercase tracking-wider">
            {userRoleForm.email}
          </label>
          <div className="flex gap-10">
            <select
              className="text-xl px-5 py-1 cursor-pointer w-40 text-center"
              value={userRoleForm.roleId}
              onChange={(e) =>
                setUserRoleForm((prev) => ({
                  ...prev,
                  roleId: Number(e.target.value),
                }))
              }
            >
              <option value="1">Uživatel</option>
              <option value="2">Člen</option>
              <option value="3">Editor</option>
            </select>
            <SubmitButton
              value="Změnit"
              className="text-xl font-normal border-l-2 border-l-white"
            />
          </div>
          <AlertMessage message={updateMessage} className="bottom-20" />
        </form>
      )}
    </div>
  )
}

export default RightsForm
