import Link from 'next/link'

const MenuDropdownLink = ({ text, link }: { text: string; link: string }) => {
  return (
    <Link href={link}>
      <p className="nav-btn-dropdown hover:bg-streetlaw-500 hover:text-white">
        {text}
      </p>
    </Link>
  )
}

export default MenuDropdownLink
