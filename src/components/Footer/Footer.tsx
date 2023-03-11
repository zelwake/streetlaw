import Image from 'next/image'

const Footer = () => {
  return (
    <div className="bg-black mt-44 h-96">
      <div className="w-sl m-auto h-full grid grid-cols-3 justify-between items-center ">
        <div>
          <Image
            src="/footer/logo-white.svg"
            alt="streetlaw footer logo"
            width={200}
            height={200}
          />
        </div>
        <div className="justify-self-center">
          <Image
            src="/footer/logo-uk.svg"
            alt="univerzita karlova footer logo"
            width={200}
            height={200}
            className="filter brightness-0 invert"
          />
        </div>
        <div className="text-white text-right">
          <ul>
            <li>O nás</li>
            <li>Plánované akce</li>
            <li>Aktuality</li>
            <li>Náš tým</li>
            <li>Kontakty</li>
          </ul>
          <p className="mt-4">Web vytvořili Tomáš Fiala a Lukáš Pánek.</p>
          <p>© 2023 Street Law – Všechna práva vyhrazena</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
