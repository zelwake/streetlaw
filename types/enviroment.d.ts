declare namespace NodeJS {
  export interface ProcessEnv {
    readonly JWT_SECRET: string
    readonly NEXT_AUTH_SECRET: string

    readonly DATABASE_URL: string
    readonly NEXT_PUBLIC_URL: string

    readonly NODEMAILER_PORT: number
    readonly NODEMAILER_HOST: string
    readonly NODEMAILER_USER: string
    readonly NODEMAILER_PASSWORD: string

    readonly NEXT_PUBLIC_WIDTH_OF_SITE: number
  }
}
