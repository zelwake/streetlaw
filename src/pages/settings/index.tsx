import Footer from '@/components/WebLayout/Footer'
import Header from '@/components/WebLayout/Header'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Profile = () => {
  const router = useRouter()

  const [slug, setSlug] = useState<string>('')

  useEffect(() => {
    router.push(`/settings/${slug}`)
  }, [slug, router])

  return (
    <>
      <Header />
      <div className="m-auto w-sl">
        <section className="w-full h-24 bg-streetlaw-500 pl-5 flex items-center">
          <h1 className="text-6xl font-semibold text-white">Nastavení</h1>
        </section>
        <section className="w-full mt-20 shadow-sl flex">
          <ul className="w-52">
            <li
              className="h-9 cursor-pointer hover:underline"
              onClick={() => setSlug('profil')}
            >
              Profil
            </li>
          </ul>
          <div>Form</div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Profile
