import Image from 'next/image'
import Link from 'next/link'
import NavigationBar from '../Menu/NavigationBar'

const Header = () => {
  return (
    <>
      <header className="fixed z-20 w-full flex">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.svg" alt="StreetLaw logo" width="80" height="80" />
        </Link>

        {/* Menu */}
        <NavigationBar />

        {/* English link*/}
        <Image
          src="/assets/uk.svg"
          alt="english version"
          width={80}
          height={80}
          className="h-8 w-auto absolute right-12 top-1"
        />
        {/* Facebook logo */}
        <Image
          src="/assets/facebook.png"
          alt="english version"
          width={80}
          height={80}
          className="h-8 w-auto absolute right-2 top-1"
        />
      </header>
      <div className="pb-20"></div>
    </>
  )
}

export default Header
