import Footer from '@/components/WebLayout/Footer'
import Header from '@/components/WebLayout/Header'
import prisma from '@/lib/prisma'
import { isExpired } from '@/scripts/timeDate/expirationTime'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

type Data = {
  status: boolean
  message: string
  error: string
}

const Confirmation = (props: Data) => {
  return (
    <>
      <Header />
      <div className="w-full min-h-[250px] text-center pt-36">
        {props.status ? (
          <>
            <h1 className="text-5xl font-bold">{props.message}</h1>
            <p className="text-xl font-semibold mt-2">
              Nyní se můžete přihlásit{' '}
              <Link href="/auth/login" className="text-streetlaw-500">
                zde
              </Link>
            </p>
          </>
        ) : (
          <h1 className="text-5xl font-bold text-red-500">{props.error}</h1>
        )}
      </div>

      <Footer />
    </>
  )
}

export default Confirmation

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, token } = context.query
  const data = {
    status: false,
    message: '',
    error: '',
  }

  if (!id || !token) {
    data.error = 'Chybějící údaje'
  } else {
    try {
      const result = await prisma.verification.findUnique({
        where: {
          id: id.toString(),
        },
      })

      if (!result) {
        data.error = 'Špatný požadavek'
        console.log(data)
      } else {
        const { hash, expiration } = result

        const expiredToken = isExpired(expiration)
        if (hash !== token.toString() || expiredToken) {
          if (expiredToken) await removeTokenFromDatabase(id.toString())
          data.error = 'Token není platný nebo mu vypršela platnost'
        } else {
          const { username, password, firstName, email, lastName } = result

          await prisma.user.create({
            data: {
              username,
              password,
              email,
              firstName,
              lastName,
            },
          })

          await removeTokenFromDatabase(id.toString())

          data.status = true
          data.message = 'Potvrzení proběhlo úspěšně'
        }
      }
    } catch (err) {
      console.log(err)
      data.error = 'Chyba na straně serveru, opakujte akci později'
    }
  }
  console.log(data)
  return {
    props: data,
  }
}

async function removeTokenFromDatabase(id: string) {
  await prisma.verification.delete({
    where: {
      id,
    },
  })
}
