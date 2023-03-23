import { SubmenuType } from '@projectType/componentTypes'

const ProfilePageMenu = ({
  slug,
  setSlug,
  submenu,
}: {
  slug: string
  setSlug: (value: string) => void
  submenu: SubmenuType
}) => {
  return (
    <ul className="w-52 h-fit grid grid-cols-1">
      {submenu.map((item) => (
        <li
          key={item.slug}
          className={
            item.slug === slug
              ? 'h-9 pl-5 mr-3 py-1 text-xl cursor-pointer bg-streetlaw-500 text-white relative'
              : 'h-9 pl-5 py-1 text-xl cursor-pointer hover:bg-streetlaw-500 hover:text-white relative'
          }
          onClick={() => setSlug(item.slug)}
        >
          {item.slug === slug && (
            <div
              className="w-0 h-0 
border-t-[18px] border-t-transparent
border-l-[12px] border-l-streetlaw-500
border-b-[18px] border-b-transparent
absolute -right-3 top-0"
            ></div>
          )}
          {item.name}
        </li>
      ))}
    </ul>
  )
}

export default ProfilePageMenu
