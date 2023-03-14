import Footer from '@/components/WebLayout/Footer'
import Header from '@/components/WebLayout/Header'
import prisma from '@/lib/prisma'
import { isExpired } from '@/scripts/timeDate/expirationTime'
import { GetServerSideProps } from 'next'

type Data = {
  data: {
    status: boolean
    message: string
    error: string
  }
}

const Confirmation = ({ data }: Data) => {
  console.log(data)
  return (
    <>
      <Header />
      <p>Zadařilo se?</p>
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
    data.message = 'Chybějící údaje'
  } else {
    try {
      const result = await prisma.verification.findUnique({
        where: {
          id: id.toString(),
        },
      })

      if (!result) {
        data.error = 'Bad request'
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
      data.error = 'Internal Server Error'
    }
  }
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
