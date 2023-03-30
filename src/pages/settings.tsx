import ProfilePageMenu from '@/components/Menu/ProfilePageMenu'
import Keywords from '@/components/SettingsPage/Keywords'
import Password from '@/components/SettingsPage/Password'
import Profile from '@/components/SettingsPage/Profile'
import Rights from '@/components/SettingsPage/Rights'
import Footer from '@/components/WebLayout/Footer'
import Header from '@/components/WebLayout/Header'
import prisma from '@/lib/prisma'
import { checkToken } from '@/scripts/api/checkToken'
import { User } from '@prisma/client'
import { SubmenuType } from '@projectType/componentTypes'
import { GetServerSideProps } from 'next/types'
import { useState } from 'react'

const ProfilePage = ({ data }: { data: User }) => {
  const [slug, setSlug] = useState<string>('profil')

  const [userData, setUserData] = useState<User>(data)

  const submenu: SubmenuType = [
    { name: 'Profil', slug: 'profil' },
    { name: 'Změna hesla', slug: 'password' },
    { name: 'Klíčová slova', slug: 'keywords' },
    { name: 'Nastavení práv', slug: 'rights' },
  ]

  const rightPanel = () => {
    switch (slug) {
      case 'profil':
        return <Profile user={userData} setUser={setUserData} />
      case 'password':
        return <Password />
      case 'keywords':
        return <Keywords />
      case 'rights':
        return <Rights />
      default:
        return null
    }
  }

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
            {rightPanel()}
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default ProfilePage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const token = await checkToken(req)

    if (!token)
      return {
        redirect: {
          destination: '/401?error=unauthorized',
          permanent: false,
        },
      }

    const user = await prisma.user.findUnique({
      where: {
        id: token.sub,
      },
    })

    return {
      props: { data: user },
    }
  } catch (e) {
    console.log(e)
    return {
      redirect: {
        destination: '/500?error=internalservererror',
        permanent: false,
      },
    }
  }
}
