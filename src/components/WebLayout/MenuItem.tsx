import { menuStyle } from '@/styles/menu'
import Link from 'next/link'

const MenuItem = ({ path, name }: { path: string; name: string }) => {
  return (
    <span>
      <Link href={path} className={`${menuStyle}`}>
        {name}
      </Link>
    </span>
  )
}

export default MenuItem
