import prisma from '@/lib/prisma'
import { RegisterType } from '@projectType/authTypes'

export async function createTemporaryUser(
  body: RegisterType,
  emailVerificationHash: string,
  expirationTime: Date,
  passwordHash: string
) {
  return await prisma.verification.upsert({
    where: {
      email: body.email,
    },
    update: {
      hash: emailVerificationHash,
      expiration: expirationTime,
      password: passwordHash,
      firstName: body.firstName,
      lastName: body.lastName,
    },
    create: {
      password: passwordHash,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      hash: emailVerificationHash,
      expiration: expirationTime,
    },
  })
}
