import { menuStyle } from '@/styles/menu'

const RollMenu = ({ name }: { name: string }) => {
  return <span className={`${menuStyle}`}>{name}</span>
}

export default RollMenu
