import ContentEditor from '@/components/Editor/ContentEditor'
import PageHeader from '@/components/Hero/PageHeading'
import Footer from '@/components/WebLayout/Footer'
import Header from '@/components/WebLayout/Header'
import { checkToken } from '@/scripts/api/checkToken'
import { AuthorizationLevel, checkRoleLevel } from '@/scripts/api/rights'
import { ContentEditorRef } from '@projectType/componentTypes'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

enum PostCategory {
  news = 1,
  mediaCoverage,
}

const Add = () => {
  const route = useRouter()

  const editorRef = useRef<ContentEditorRef>(null)
  const [title, setTitle] = useState<string>('')
  const [category, setCategory] = useState<PostCategory>(PostCategory.news)

  const log = async () => {
    if (editorRef.current) {
      const body = {
        categoryId: category,
        title,
        text: editorRef.current.getContent(),
      }
      const adder = await fetch('/api/pridat', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const json = await adder.json()

      switch (adder.status) {
        case 201:
          return route.replace(json.message)
        case 400:
        case 401:
        case 500:
        default:
          alert(json.error || 'something went terribly wrong')
      }
    }
  }

  return (
    <>
      <Header />
      <main className="w-sl m-auto">
        <PageHeader heading="Přidat" />
        <section className="w-full mt-20 shadow-sl flex">
          <div className="p-5 w-full grid grid-cols-2">
            <h2 onClick={() => setCategory(PostCategory.news)}>Aktuality</h2>
            <h2 onClick={() => setCategory(PostCategory.mediaCoverage)}>
              Mediální ohlasy
            </h2>
          </div>
        </section>
        <section>
          <label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
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
        props: {},
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
