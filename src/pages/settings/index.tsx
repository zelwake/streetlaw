import Profile from '@/components/Forms/Profile'
import ProfilePageMenu from '@/components/Menu/ProfilePageMenu'
import Footer from '@/components/WebLayout/Footer'
import Header from '@/components/WebLayout/Header'
import { SubmenuType } from '@projectType/componentTypes'
import { useState } from 'react'

const ProfilePage = () => {
  const [slug, setSlug] = useState<string>('profil')

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
          <ProfilePageMenu setSlug={setSlug} slug={slug} submenu={submenu} />
          <div className="border-l-[1px] w-[1085px] border-black">
            <Profile />
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default ProfilePage
