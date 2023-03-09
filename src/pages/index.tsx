import MainBanner from '@/components/hero/MainBanner'
import Header from '@/components/WebLayout/Header'

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-screen flex flex-col items-center pt-20">
        <MainBanner />
      </main>
    </>
  )
}
