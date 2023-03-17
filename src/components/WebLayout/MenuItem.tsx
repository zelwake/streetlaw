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
        <Link href={path} className="nav-btn">
          {name}
        </Link>
      </span>
    )
  else
    return (
      <span>
        <Link href={path} className="nav-btn" onClick={fn}>
          {name}
        </Link>
      </span>
    )
}

export default MenuItem
