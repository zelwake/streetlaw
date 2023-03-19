import Footer from '@/components/WebLayout/Footer'
import Header from '@/components/WebLayout/Header'
import { GetServerSideProps } from 'next'

const Page = (props: { path: string }) => {
  return (
    <>
      <Header />
      <p>{props.path}</p>
      <Footer />
    </>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { path: context.query.page },
  }
}
