import { JWT } from 'next-auth/jwt/types'
import { getUserRoleId } from '../database/getUserRole'

export async function checkRoleLevel(
  token: JWT | null,
  authorizationLevel: number
): Promise<boolean> {
  if (!token || !token.sub) return false
  else {
    const roleId = await getUserRoleId(token.sub)

    return roleId && roleId >= authorizationLevel ? true : false
  }
}

type UserRoleList = {
  email: string
  role: {
    name: string
  }
  roleId: number
}[]

export type SerializedUserRoleList = {
  id: number
  name: string
  users: UserRoleList
}[]

export function serializeUserRoleList(list: UserRoleList) {
  const serialized: SerializedUserRoleList = [
    { id: 1, name: 'user', users: [] },
    { id: 2, name: 'member', users: [] },
    { id: 3, name: 'editor', users: [] },
  ]
  list.forEach((val) => {
    serialized[val.roleId - 1].users.push(val)
  })

  return serialized
}
