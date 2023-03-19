import { LinkListType } from '@projectType/componentTypes'
import { useState } from 'react'
import MenuDropdownLink from './MenuDropdownLink'

const MenuDropdownGroup = ({
  name,
  linkList,
}: {
  name: string
  linkList: LinkListType[]
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <>
      {showMenu ? (
        <div className="inline-block" onMouseLeave={() => setShowMenu(false)}>
          <span className="nav-btn">{name}</span>
          <div className="nav-dropdown-menu">
            {linkList.map((item) => (
              <MenuDropdownLink
                key={item.link}
                text={item.name}
                link={item.link}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="inline-block" onMouseEnter={() => setShowMenu(true)}>
          <span className="nav-btn">{name}</span>
        </div>
      )}
    </>
  )
}

export default MenuDropdownGroup
