import ContentStyle from '@/components/ContentStyle'
import PageHeader from '@/components/Hero/PageHeading'
import Footer from '@/components/WebLayout/Footer'
import Header from '@/components/WebLayout/Header'
import Main from '@/components/WebLayout/Main'
import { getPostInfo } from '@/scripts/database/getPostInfo'
import { fullUsername } from '@/scripts/textFormatting/fullUsername'
import { localeDateString } from '@/scripts/timeDate/locateDateString'
import { PostInfoProps } from '@projectType/componentTypes'
import { GetServerSideProps } from 'next/types'

const NewsPage = ({ data }: PostInfoProps) => {
  return (
    <>
      <Header />
      <Main>
        <PageHeader heading={data.title} />
        <ContentStyle />
        <div className="flex flex-row-reverse gap-4 pr-4">
          <time className="italic">{localeDateString(data.createdAt)}</time>
          <h3>{fullUsername(data.creator)}</h3>
          {data.changed && data.changedBy && data.changedAt && (
            <p>
              Naposledy změněno {localeDateString(data.changedAt)} uživatelem{' '}
              {fullUsername(data.changedBy)}
            </p>
          )}
        </div>
        <article
          className="news-info"
          dangerouslySetInnerHTML={{ __html: data.detail }}
        ></article>
      </Main>
      <Footer />
    </>
  )
}

export default NewsPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let route = query.page

  if (route) {
    route = route as string
    const info = await getPostInfo(route)

    if (info && info.Post_category.name == 'news') {
      return {
        props: {
          data: JSON.parse(JSON.stringify(info)),
        },
      }
    }
  }
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}
