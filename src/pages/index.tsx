import MainBanner from '@/components/hero/MainBanner'
import Info from '@/components/NumberText/Info'
import Header from '@/components/WebLayout/Header'

export default function Home() {
  const WIDTH_OF_SITE = process.env.NEXT_PUBLIC_WIDTH_OF_SITE // px

  return (
    <>
      <Header />
      <main className={`w-[${WIDTH_OF_SITE}px] m-auto pt-20`}>
        <MainBanner />
        <section className="mt-5">
          <h2 className="text-4xl text-center">
            „Zažít právo jinak. Hravě a interaktivně. S právníky.“
          </h2>
        </section>
        <section className="mt-9 flex gap-5 justify-between">
          <Info number="6125" text="středoškoláků prošlo našimi akcemi" />
          <Info number="362" text="právníků prošlo naším programem" />
          <Info number="186" text="uspořádaných simulovaných soudů" />
        </section>
        <section>
          <h2>Aktuality:</h2>
        </section>
      </main>
    </>
  )
}
