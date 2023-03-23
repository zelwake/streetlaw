import Profile from '@/components/Forms/Profile'
import ProfilePageMenu from '@/components/Menu/ProfilePageMenu'
import Footer from '@/components/WebLayout/Footer'
import Header from '@/components/WebLayout/Header'
import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { SubmenuType } from '@projectType/componentTypes'
import { getToken } from 'next-auth/jwt'
import { GetServerSideProps } from 'next/types'
import { useState } from 'react'

const ProfilePage = ({ data }: { data: User | string }) => {
  const [slug, setSlug] = useState<string>('profil')

  if (typeof data == 'string') {
    return (
      <p className="m-auto w-full text-9xl text-red-600 font-bold text-center">
        {data}
      </p>
    )
  }

  const submenu: SubmenuType = [
    { name: 'Profil', slug: 'profil' },
    { name: 'Změna hesla', slug: 'password' },
    { name: 'Klíčová slova', slug: 'keywords' },
    { name: 'Nastavení práv', slug: 'rights' },
  ]

  const rightPanel = () => {
    switch (slug) {
      case 'profil':
        return <Profile user={data} />
      case 'password':
      case 'keywords':
      case 'rights':
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
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    if (!token) return { props: { data: 'Not logged in' } }

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
      props: { data: 'Internal server error' },
    }
  }
}
