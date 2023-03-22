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
                    ? 'h-9 pl-5 mr-3 py-1 text-xl cursor-pointer bg-streetlaw-500 text-white relative'
                    : 'h-9 pl-5 py-1 text-xl cursor-pointer hover:bg-streetlaw-500 hover:text-white relative'
                }
                onClick={() => setSlug(item.slug)}
              >
                {item.slug === slug && (
                  <div
                    className="w-0 h-0 
  border-t-[18px] border-t-transparent
  border-l-[12px] border-l-streetlaw-500
  border-b-[18px] border-b-transparent
  absolute -right-3 top-0"
                  ></div>
                )}
                {item.name}
              </li>
            ))}
          </ul>
          <div className="border-l-[1px] w-[1085px] border-black">
            <form className="grid grid-cols-5 items-center pl-9 pr-16 mt-7 gap-7">
              <label htmlFor="email" className="profile-label">
                Email:
              </label>
              <input id="email" type="email" className="profile-input" />
              <label htmlFor="name" className="profile-label">
                Jméno:
              </label>
              <input id="name" type="text" className="profile-input" />
              <label htmlFor="surname" className="profile-label">
                Příjmení:
              </label>
              <input id="surname" type="text" className="profile-input" />
              <label htmlFor="about" className="profile-label place-self-start">
                Popis:
              </label>
              <textarea
                id="about"
                cols={64}
                rows={10}
                className="col-span-4 resize-none overflow-y-scroll outline-none py-1 px-3 text-2xl bg-gray-100"
              ></textarea>
              <label htmlFor="photo" className="profile-label">
                Fotografie:
              </label>
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
