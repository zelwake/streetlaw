import MenuContainer from '@/components/Menu/MenuContainer'
import MenuItem from '@/components/WebLayout/MenuItem'
import RollMenu from '@/components/WebLayout/RollMenu'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export type ShowMenuType = {
  one: boolean
  two: boolean
  three: boolean
  four: boolean
}
const Header = () => {
  const { data: session } = useSession()

  const [showMenu, setShowMenu] = useState<ShowMenuType>({
    one: false,
    two: false,
    three: false,
    four: false,
  })
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
          <div className="relative">
            <RollMenu
              onMouseOver={setShowMenu}
              menuPosition={'one'}
              name="Street Law"
            />
            <RollMenu
              onMouseOver={setShowMenu}
              menuPosition={'two'}
              name="O nás"
            />
            <RollMenu
              onMouseOver={setShowMenu}
              menuPosition={'three'}
              name="Co nabízíme"
            />
            <RollMenu
              onMouseOver={setShowMenu}
              menuPosition={'four'}
              name="Materiály"
            />
            <MenuContainer showMenu={showMenu} />
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
