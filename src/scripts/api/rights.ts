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
