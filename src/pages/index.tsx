import MainBanner from '@/components/hero/MainBanner'
import Header from '@/components/WebLayout/Header'

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-screen flex flex-col items-center pt-20">
        <MainBanner />
        <section>
          <p>„Zažít právo jinak. Hravě a interaktivně. S právníky.“</p>
        </section>
        <section>
          <h2>Aktuality:</h2>
        </section>
      </main>
    </>
  )
}
