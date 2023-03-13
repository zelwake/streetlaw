import MainBanner from '@/components/Hero/MainBanner'
import Info from '@/components/NumberText/Info'
import News from '@/components/NumberText/News'
import Footer from '@/components/WebLayout/Footer'
import Header from '@/components/WebLayout/Header'
import { NewsType } from '@projectType/componentTypes'
import { GetServerSideProps } from 'next/types'

export default function Home({ news }: { news: NewsType[] }) {
  return (
    <>
      <Header />
      <main className={`w-sl m-auto pt-20`}>
        <MainBanner />
        <section className="mt-5">
          <h2 className="text-4xl text-center">
            „Zažít právo jinak. Hravě a interaktivně. S právníky.“
          </h2>
        </section>
        <section className="mt-9 flex justify-between">
          <Info number="6125" text="středoškoláků prošlo našimi akcemi" />
          <Info number="362" text="právníků prošlo naším programem" />
          <Info number="186" text="uspořádaných simulovaných soudů" />
        </section>
        <section className="mt-16">
          <h2 className="text-5xl font-semibold">Aktuality</h2>
          <ul>
            {news.map((single, index) => (
              <News
                key={index}
                date={single.date}
                title={single.title}
                abstract={single.abstract}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const news = [
    {
      date: new Date(2022, 8, 25),
      title: 'Kurzy pro učitele v zimním semestru 2022/2023',
      abstract:
        'Pro zájemce z řad učitelů jsme si připravili na podzim hned tři akreditované kurzy! Více informací a návod, jak se   přihlásit, naleznete na jednotlivých odkazovaných stránkách. Didaktika práva dne 6. 10. 2022 Základy soukromého práva dne 3. 11. 2022 Základy veřejného práva dne dne 14. 11. 2022',
    },
    {
      date: new Date(2022, 7, 1),
      title: 'Street Law v Pražském deníku',
      abstract:
        'Po delší době vyšel v médiích nový článek o programu Street Law. V pondělí 1. srpna 2022 jste si mohli přečíst rozhovor s našimi dvěma členkami, Zuzkou Vanýskovou a Aničkou Lukešovou, o našich akcích nebo třeba o tom, proč je s právem důležité seznamovat už studenty středních škol.',
    },
    {
      date: new Date(2022, 2, 8),
      title: 'Street Law Univerzita pro SŠ studenty',
      abstract:
        'V březnu a dubnu se odehraje druhý ročník Street Law univerzity pro studenty a studentky středních škol. V té budete mít možnost zažít právo jinak, než jak jste zvyklí ze školních lavic. A třeba Vám to pomůže rozhodnout se ke studiu práva i na univerzitě opravdové! Projekt Street Law možná znáte ze své střední školy. […]',
    },
    {
      date: new Date(2022, 2, 7),
      title: 'Nabídka lidskoprávních workshopů pro školy',
      abstract:
        'OD 8. 4. 2022 JIŽ NENÍ MOŽNÉ SE O WORKSHOP PŘIHLÁSIT. V průběhu března až června nabízíme školám uspořádání půldenního workshopu o lidských právech. Interaktivní formou studentům představíme základní informace o lidských právech, vyzkouší si práci s Listinou základních práv a svobod, zjistí, jak se řeší střet lidských práv a na závěr se utkají v […]',
    },
    {
      date: new Date(2022, 0, 17),
      title: 'Workshopy pro ZŠ Suchdol',
      abstract:
        'V lednu 2022 jsme po delší odmlce způsobené pandemií onemocnění covid-19 uskutečnily celkem čtyři workshopy pro ZŠ Suchdol v Praze. Pro žáky devátých ročníků jsme připravili interaktivní program o právu a morálce a také o základních spotřebitelských právech týkajících se například reklamace zboží nebo odstoupení od smlouvy ve lhůtě 14 dnů v případě distančních smluv.',
    },
  ]
  return {
    props: { news: JSON.parse(JSON.stringify(news)) },
  }
}
