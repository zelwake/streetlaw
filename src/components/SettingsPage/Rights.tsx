import { SerializedUserRoleList } from '@/scripts/api/rights'
import { GetUserRoleResponse } from '@projectType/apiInterface'
import { useCallback, useEffect, useState } from 'react'

const roles = ['Uživatel', 'Člen', 'Editor']

const Rights = () => {
  const [userRoleForm, setUserRoleForm] = useState<{
    email: string
    roleId: number
  }>({ email: '', roleId: 0 })

  const [userList, setUserList] = useState<SerializedUserRoleList>([])

  const fetchUserList = useCallback(async () => {
    const response = await fetch('/api/settings/rights')
    const body: GetUserRoleResponse = await response.json()

    if (typeof body.data === 'string') {
      switch (response.status) {
        case 401:
          alert('Nemáte přístup')
          break
        case 500:
        default:
          alert('Něco se pokazilo. Opakujte akci později.')
          break
      }
    } else setUserList(body.data)
  }, [])

  useEffect(() => {
    fetchUserList()
  }, [fetchUserList])

  const updateRole = async (e: React.FormEvent) => {
    e.preventDefault()
    const patch = await fetch('/api/settings/rights', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userRoleForm),
    })

    const json = patch.json()
    switch (patch.status) {
      case 200:
        fetchUserList()
        break

      default:
        break
    }
  }

  return (
    <div className="p-5">
      {userList.map((group) => (
        <ul key={group.id}>
          <h2>{roles[group.id - 1]}</h2>
          {group.users.map((user) => (
            <li
              key={user.email}
              onClick={() =>
                setUserRoleForm({ email: user.email, roleId: user.roleId })
              }
            >
              {user.email}
            </li>
          ))}
        </ul>
      ))}
      {userRoleForm.roleId != 0 && (
        <form onSubmit={updateRole}>
          <label>{userRoleForm.email}</label>
          <select
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
          <input type="submit" value="Změnit" />
        </form>
      )}
    </div>
  )
}

export default Rights
