import { IncomingMessage } from 'http'
import { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'

export async function checkToken(
  req:
    | NextApiRequest
    | (IncomingMessage & {
        cookies: Partial<{
          [key: string]: string
        }>
      })
) {
  return await getToken({ req, secret: process.env.JWT_SECRET })
}
