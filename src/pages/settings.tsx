import PageHeader from '@/components/Hero/PageHeading'
import ProfilePageMenu from '@/components/Menu/ProfilePageMenu'
import Keywords from '@/components/SettingsPage/Keywords'
import Password from '@/components/SettingsPage/Password'
import Profile from '@/components/SettingsPage/Profile'
import Rights from '@/components/SettingsPage/Rights'
import Footer from '@/components/WebLayout/Footer'
import Header from '@/components/WebLayout/Header'
import { checkToken } from '@/scripts/api/checkToken'
import { AuthorizationLevel, checkRoleLevel } from '@/scripts/api/rights'
import { getUser } from '@/scripts/database/getUser'
import { User } from '@prisma/client'
import { SubmenuType } from '@projectType/componentTypes'
import { JWT } from 'next-auth/jwt'
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
      <main className="m-auto w-sl">
        <PageHeader heading="Nastavení" />
        <section className="w-full mt-20 shadow-sl flex">
          <ProfilePageMenu setSlug={setSlug} slug={slug} submenu={submenu} />
          <div className="border-l-[1px] w-[1085px] border-black">
            {rightPanel()}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ProfilePage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const token = await checkToken(req)

    const verification = await checkRoleLevel(token, AuthorizationLevel.Member)

    if (!verification)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }

    const user = await getUser((token as JWT).sub as string)

    return {
      props: { data: user },
    }
  } catch (e) {
    console.log(e)
    return {
      redirect: {
        destination: '/error?error=500',
        permanent: false,
      },
    }
  }
}
