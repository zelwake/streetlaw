import MainBanner from '@/components/hero/MainBanner'
import Info from '@/components/NumberText/Info'
import Header from '@/components/WebLayout/Header'

export default function Home() {
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
            <li className="w-full max-h-52 flex justify-between pt-10">
              <div className="w-32 h-32 bg-streetlaw-500 text-white text-center flex flex-col justify-center">
                <p className="text-5xl font-bold">25</p>
                <p className="text-xl font-semibold">září</p>
                <p className="text-xl font-semibold">2022</p>
              </div>
              <div className="w-[1100px] shadow-sl px-6 py-5 grid grid-cols-8 grid-rows-3">
                <h3 className="text-4xl font-semibold col-span-7">
                  Kurzy pro učitele v zimním semestru 2022/2023
                </h3>
                <p className="w-[950px] text-lg text-justify col-span-7 row-start-2 row-span-2">
                  Pro zájemce z řad učitelů jsme si připravili na podzim hned
                  tři akreditované kurzy! Více informací a návod, jak se
                  přihlásit, naleznete na jednotlivých odkazovaných stránkách.
                  Didaktika práva dne 6. 10. 2022 Základy soukromého práva dne
                  3. 11. 2022 Základy veřejného práva dne dne 14. 11. 2022
                </p>
                <div className="col-start-8 row-start-1 row-span-3 flex justify-end items-center">
                  <div className="bg-streetlaw-500 w-10 h-10 rounded-full relative">
                    <button className="text-white text-4xl font-semibold absolute left-[10px] bottom-1">
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </>
  )
}
