import { menuStyle } from '@/styles/menu'
import Link from 'next/link'

const MenuItem = ({
  path,
  name,
  fn,
}: {
  path: string
  name: string
  fn?: () => void
}) => {
  if (fn === undefined)
    return (
      <span>
        <Link href={path} className={`${menuStyle}`}>
          {name}
        </Link>
      </span>
    )
  else
    return (
      <span>
        <Link href={path} className={`${menuStyle}`} onClick={fn}>
          {name}
        </Link>
      </span>
    )
}

export default MenuItem
