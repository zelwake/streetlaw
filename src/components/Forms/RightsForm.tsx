import { SerializedUserRoleList } from '@/scripts/api/rights'
import { UserRoleForm } from '@projectType/componentTypes'
import { Dispatch, SetStateAction } from 'react'

const RightsForm = ({
  userList,
  setUserRoleForm,
  userRoleForm,
  updateRole,
}: {
  userList: SerializedUserRoleList
  setUserRoleForm: Dispatch<SetStateAction<UserRoleForm>>
  userRoleForm: UserRoleForm
  updateRole: (e: React.FormEvent) => Promise<void>
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
          className="flex flex-col gap-8 items-center justify-center grow"
        >
          <label className="text-lg uppercase tracking-wide">
            {userRoleForm.email}
          </label>
          <select
            className="text-xl px-5 py-1 cursor-pointer"
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
          <input
            type="submit"
            value="Změnit"
            className="px-6 py-2 text-xl bg-streetlaw-500 text-white cursor-pointer"
          />
        </form>
      )}
    </div>
  )
}

export default RightsForm
