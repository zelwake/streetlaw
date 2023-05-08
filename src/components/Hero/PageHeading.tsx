import Head from 'next/head'

const PageHeader = ({ heading }: { heading: string }) => {
  return (
    <>
      <Head>
        <title>{heading}</title>
      </Head>
      <header className="w-full h-24 bg-streetlaw-500 pl-5 flex items-center">
        <h1 className="text-6xl tracking-wide font-semibold text-white">
          {heading}
        </h1>
      </header>
    </>
  )
}

export default PageHeader
