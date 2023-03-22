import Footer from '@/components/WebLayout/Footer'
import Header from '@/components/WebLayout/Header'
import { useState } from 'react'

const Profile = () => {
  const [slug, setSlug] = useState<string>('')

  type SubmenuType = {
    name: string
    slug: string
  }[]

  const submenu: SubmenuType = [
    { name: 'Profil', slug: 'profil' },
    { name: 'Změna hesla', slug: 'password' },
    { name: 'Klíčová slova', slug: 'keywords' },
    { name: 'Nastavení práv', slug: 'rights' },
  ]

  return (
    <>
      <Header />
      <div className="m-auto w-sl">
        <section className="w-full h-24 bg-streetlaw-500 pl-5 flex items-center">
          <h1 className="text-6xl font-semibold text-white">Nastavení</h1>
        </section>
        <section className="w-full mt-20 shadow-sl flex">
          <ul className="w-52 h-fit grid grid-cols-1">
            {submenu.map((item) => (
              <li
                key={item.slug}
                className={
                  item.slug === slug
                    ? 'h-9 pl-5 py-1 text-xl cursor-pointer bg-streetlaw-500 text-white'
                    : 'h-9 pl-5 py-1 text-xl cursor-pointer hover:font-bold'
                }
                onClick={() => setSlug(item.slug)}
              >
                {item.name}
              </li>
            ))}
          </ul>
          <div>
            <form>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" />
              <label htmlFor="name">Jméno</label>
              <input id="name" type="text" />
              <label htmlFor="surname">Příjmení</label>
              <input id="surname" type="text" />
              <label htmlFor="about">Popis</label>
              <input id="about" type="textarea" />
              <label htmlFor="photo">Fotografie</label>
              <input type="file" />
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Profile
