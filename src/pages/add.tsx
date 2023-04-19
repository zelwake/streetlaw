import PageHeader from '@/components/Hero/PageHeading'
import Footer from '@/components/WebLayout/Footer'
import Header from '@/components/WebLayout/Header'
import { checkToken } from '@/scripts/api/checkToken'
import { AuthorizationLevel, checkRoleLevel } from '@/scripts/api/rights'
import { Editor } from '@tinymce/tinymce-react'
import { GetServerSideProps } from 'next'
import { JWT } from 'next-auth/jwt'
import { useRef } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'

const Add = ({ data }: { data: JWT }) => {
  const editorRef = useRef<TinyMCEEditor | null>(null)
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
          <Editor
            tinymceScriptSrc={
              process.env.NEXT_PUBLIC_URL + '/tinymce/tinymce.min.js'
            }
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
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
        props: { data: token },
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
