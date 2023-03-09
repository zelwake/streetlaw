import Image from 'next/image'
import Link from 'next/link'
import MenuItem from './MenuItem'
import RollMenu from './RollMenu'

const Header = () => {
  return (
    <header className="absolute w-full flex">
      {/* Logo */}
      <Link href="/">
        <Image src="/logo.svg" alt="StreetLaw logo" width="80" height="80" />
      </Link>

      {/* Menu */}
      <nav className="grow flex justify-between h-10 items-center shadow-sl">
        {/* Left side */}
        <div>
          <RollMenu name="Street Law" />
          <RollMenu name="O nás" />
          <RollMenu name="Co nabízíme" />
          <RollMenu name="Materiály" />
        </div>
        {/* Right side */}
        <div>
          {/* on user-role 2+ */}
          <MenuItem path="/#" name="Přidat" />
          {/* on user-role 1+ */}
          <MenuItem path="/#" name="Nastavení" />
          {/* on user-role 0+ */}
          <MenuItem path="/#" name="Odhlásit se" />
        </div>
      </nav>
      {/* English link*/}
      {/* Facebook logo */}
    </header>
  )
}

export default Header
