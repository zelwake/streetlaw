import ContentEditor from '@/components/Editor/ContentEditor'
import PageHeader from '@/components/Hero/PageHeading'
import Footer from '@/components/WebLayout/Footer'
import Header from '@/components/WebLayout/Header'
import { checkToken } from '@/scripts/api/checkToken'
import { AuthorizationLevel, checkRoleLevel } from '@/scripts/api/rights'
import { ContentEditorRef } from '@projectType/componentTypes'
import { GetServerSideProps } from 'next'
import { JWT } from 'next-auth/jwt'
import { useRef } from 'react'

const Add = ({ id }: { id: string }) => {
  const editorRef = useRef<ContentEditorRef>(null)
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }

  return (
    <>
      <Header />
      <main className="w-sl m-auto">
        <PageHeader heading="Přidat" />
        <section className="w-full mt-20 shadow-sl flex">
          <div className="p-5 w-full grid grid-cols-2">
            <h2>Aktualita</h2>
            <h2>Článek</h2>
          </div>
        </section>
        <section>
          <ContentEditor editorId="add" ref={editorRef} />
          <button onClick={log}>Click</button>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Add

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const token = await checkToken(req)

    const verification = await checkRoleLevel(token, AuthorizationLevel.Editor)

    if (verification)
      return {
        props: { id: (token as JWT).sub },
      }
    else
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
  } catch (e) {
    console.log(e)
    return {
      redirect: {
        destination: '/error?error=500',
        permanent: false,
      },
    }
  }
}
