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
        {/* Facebook logo */}
      </header>
      <div className="pb-20"></div>
    </>
  )
}

export default Header
