import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export function createTransporter(): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
  return nodemailer.createTransport({
    port: process.env.NODEMAILER_PORT,
    host: process.env.NODEMAILER_HOST,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
    secure: true,
  })
}
