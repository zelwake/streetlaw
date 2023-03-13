import prisma from '@/lib/prisma'
import { compareHash } from '@/scripts/hash/bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,

  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials) {
          console.log(credentials)

          const user = await prisma.user.findUnique({
            where: {
              username: credentials.username,
            },
          })

          if (user) {
            const checkPassword = await compareHash(
              credentials.password,
              user.password
            )
            if (checkPassword)
              return {
                id: user.id,
                name: user.username,
              }
          }
        }
        return null
      },
    }),
  ],

  events: {
    async session({ token }) {
      console.log(token)
    },
  },

  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
})
