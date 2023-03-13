import prisma from '@/lib/prisma'
import { checkUserInDatabase } from '@/scripts/checkUserDatabase'
import { hashedPassword } from '@/scripts/hash/bcrypt'
import { randomHash } from '@/scripts/hash/randomHash'
import { setExpirationDate } from '@/scripts/timeDate/expirationTime'
import { validateCredentials } from '@/scripts/validateCredentials'
import { RegisterType } from '@projectType/authTypes'
import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (
    !req.body.email ||
    !req.body.username ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.lastName
  ) {
    return res.status(400).json({ error: 'Missing parameters' })
  }

  const body: RegisterType = req.body

  try {
    const emailExist = await checkUserInDatabase(req.body.email, 'email')

    if (emailExist) {
      return res.status(400).json({ error: 'Email už je registrován' })
    }

    const usernameExist = await checkUserInDatabase(
      req.body.username,
      'username'
    )

    if (usernameExist) {
      return res.status(400).json({ error: 'Uživatelské jméno už existuje' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Internal server error' })
  }

  const { error, success } = validateCredentials(body)

  if (error && !success) {
    return res.status(400).json({ error })
  } else if (!error && success) {
    const passwordHash = await hashedPassword(req.body.password)
    const emailVerificationHash = randomHash()
    const expirationTime = setExpirationDate()

    try {
      const created = await prisma.verification.create({
        data: {
          username: req.body.username,
          password: passwordHash,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          hash: emailVerificationHash,
          expiration: expirationTime,
        },
      })
      //todo send mail with verification link

      const transporter = nodemailer.createTransport({
        port: process.env.NODEMAILER_PORT,
        host: process.env.NODEMAILER_HOST,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASSWORD,
        },
        secure: true,
      })

      const mailData = {
        from: 'noreply@streetlaw.eu',
        to: req.body.email,
        subject: 'Zpráva od noreply.registrace',
        html: `<h1>Děkujeme za registraci</h1>
        <p>Pro její dokončení klikněte na odkaz níže</p>
        <p><a href='http://localhost:3000/api/auth/confirmation?id=${created.id}&token=${emailVerificationHash}'>Potvrzení emailu</a></p>`,
      }

      transporter.sendMail(mailData, (err, info) => {
        err ? console.log(err) : console.log(info)
      })

      return res
        .status(201)
        .json({ message: `Email byl zaslán na adresu ${body.email}` })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
