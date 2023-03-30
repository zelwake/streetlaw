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
  const serialized: SerializedUserRoleList = []
  list.forEach((val) => {
    if (serialized.some((v) => v.id == val.roleId)) {
      serialized[val.roleId - 1].users.push(val)
    } else {
      serialized[val.roleId - 1] = {
        id: val.roleId,
        name: val.role.name,
        users: [val],
      }
    }
  })

  return serialized
}
