import crypto from 'crypto'

export const randomHash = (): string => crypto.randomBytes(20).toString('hex')
