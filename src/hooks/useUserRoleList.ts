import { SerializedUserRoleList } from '@/scripts/api/rights'
import {
  GetUserRoleResponse,
  PatchUserRoleResponse,
} from '@projectType/apiInterface'
import { useCallback, useEffect, useState } from 'react'

export default function useUserRoleList() {
  const [userList, setUserList] = useState<SerializedUserRoleList>([])

  const fetchUserList = useCallback(async () => {
    const response = await fetch('/api/settings/rights')
    const body: GetUserRoleResponse = await response.json()

    if (typeof body.data === 'string') {
      switch (response.status) {
        case 401:
          alert('Nemáte přístup.')
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

  const updateUserList = (
    userRoleForm: { email: string; roleId: number },
    json: PatchUserRoleResponse
  ) => {
    setUserList((prev) =>
      prev
        .map((role) => {
          return {
            ...role,
            users: role.users.filter(
              (user) => user.email !== userRoleForm.email
            ),
          }
        })
        .map((role) => {
          if (role.id === userRoleForm.roleId) {
            return {
              ...role,
              users: [...role.users, json.data],
            }
          } else {
            return role
          }
        })
    )
  }

  return { userList, updateUserList }
}
