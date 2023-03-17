import { ShowMenuType } from './Header'

const RollMenu = ({
  name,
  onMouseOver,
  menuPosition,
}: {
  name: string
  onMouseOver: (
    value: ShowMenuType | ((prevVar: ShowMenuType) => ShowMenuType)
  ) => void
  menuPosition: string
}) => {
  return (
    <span
      className="nav-btn"
      onMouseEnter={() =>
        onMouseOver((prev) => ({
          ...prev,
          [menuPosition]: true,
        }))
      }
      onMouseLeave={() =>
        onMouseOver((prev) => ({
          ...prev,
          [menuPosition]: false,
        }))
      }
    >
      {name}
    </span>
  )
}

export default RollMenu
