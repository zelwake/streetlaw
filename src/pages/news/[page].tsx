import ContentStyle from '@/components/ContentStyle'
import PageHeader from '@/components/Hero/PageHeading'
import Footer from '@/components/WebLayout/Footer'
import Header from '@/components/WebLayout/Header'
import Main from '@/components/WebLayout/Main'
import prisma from '@/lib/prisma'
import { Post } from '@prisma/client'
import { GetServerSideProps } from 'next/types'

type NewsInfo = {
  data: Post & {
    Post_category: {
      name: string
    }
    creator: {
      firstName: string
      lastName: string
    }
    changedBy: {
      firstName: string
      lastName: string
    } | null
  }
}

const NewsPage = ({ data }: NewsInfo) => {
  return (
    <>
      <Header />
      <Main>
        <PageHeader heading={data.title} />
        <ContentStyle />
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
    const info = await prisma.post.findUnique({
      where: {
        id: route,
      },
      include: {
        Post_category: {
          select: {
            name: true,
          },
        },
        creator: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        changedBy: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    })

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
