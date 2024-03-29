import { checkToken } from '@/scripts/api/checkToken'
import { getUserPasswordHash, updatePassword } from '@/scripts/api/passwords'
import { AuthorizationLevel, checkRoleLevel } from '@/scripts/api/rights'
import { comparePasswordHash, hashedPassword } from '@/scripts/hash/bcrypt'
import { validatePassword } from '@/scripts/validateCredentials'
import {
  PasswordInterface,
  PasswordPUTInterface,
} from '@projectType/apiInterface'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PasswordPUTInterface>
) {
  const token = await checkToken(req)

  const authorized = await checkRoleLevel(token, AuthorizationLevel.Member)

  if (!authorized) return res.status(401).json({ data: 'Unauthorized' })

  if (req.method === 'PUT') {
    const { oldPassword, newPassword }: PasswordInterface = req.body

    if (!oldPassword.trim() || !newPassword.trim())
      return res.status(400).json({ data: 'Missing information' })

    try {
      const userPassword = await getUserPasswordHash(token?.sub as string)
      if (!userPassword)
        return res.status(400).json({ data: 'Wrong credentials' })

      const rightPassword = await comparePasswordHash(
        oldPassword,
        userPassword.password
      )

      if (!rightPassword)
        return res.status(400).json({ data: 'Wrong credentials' })

      const valid = validatePassword(newPassword)
      if (valid) return res.status(400).json({ data: valid })

      const hashed = await hashedPassword(newPassword)

      await updatePassword(token?.sub as string, hashed)
      return res.status(200).json({ data: 'Password changed' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ data: 'Internal server error' })
    }
  }

  return res.status(405).json({ data: 'Method not allowed' })
}
