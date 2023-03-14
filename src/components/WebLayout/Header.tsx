import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import MenuItem from './MenuItem'
import RollMenu from './RollMenu'

const Header = () => {
  const { data: session } = useSession()
  return (
    <>
      <header className="fixed z-20 w-full flex">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.svg" alt="StreetLaw logo" width="80" height="80" />
        </Link>

        {/* Menu */}
        <nav className="grow flex bg-white justify-between h-10 items-center shadow-sl">
          {/* Left side */}
          <div>
            <RollMenu name="Street Law" />
            <RollMenu name="O nás" />
            <RollMenu name="Co nabízíme" />
            <RollMenu name="Materiály" />
          </div>
          {/* Right side */}
          {session && (
            <div>
              {/* on user-role 3+ */}
              <MenuItem path="/#" name="Přidat" />
              {/* on user-role 2+ */}
              <MenuItem path="/#" name="Nastavení" />
              {/* on user-role 1+ */}
              <MenuItem path="/" name="Odhlásit se" fn={() => signOut()} />
            </div>
          )}
        </nav>
        {/* English link*/}
        {/* Facebook logo */}
      </header>
      <div className="pb-20"></div>
    </>
  )
}

export default Header
