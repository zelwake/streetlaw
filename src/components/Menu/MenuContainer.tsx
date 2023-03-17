import { ShowMenuType } from '../WebLayout/Header'
import MenuDropdownButton from './MenuDropdownButton'

const MenuContainer = ({ showMenu }: { showMenu: ShowMenuType }) => {
  return (
    <div className="nav-dropdown-menu">
      {showMenu.one && (
        <div>
          <MenuDropdownButton text="Co je Street Law" />
          <MenuDropdownButton text="Street Law na PF UK" />
          <MenuDropdownButton text="Pedagogické minimum na PF UK" />
          <MenuDropdownButton text="Historie Street Law" />
        </div>
      )}
      {showMenu.two && (
        <div>
          <MenuDropdownButton text="Kontakty" />
          <MenuDropdownButton text="Náš tým" />
          <MenuDropdownButton text="Mediální ohlasy" />
          <MenuDropdownButton text="Aktuality" />
          <MenuDropdownButton text="Projekt Vzdělanější učitelé pro vzdělanější společnost" />
          <MenuDropdownButton text="Pětidenní seminář Street Law: Lidská práva v praxi" />
        </div>
      )}
      {showMenu.three && (
        <div>
          <MenuDropdownButton text="Kurzy pro učitele" />
          <MenuDropdownButton text="Pro školy" />
          <MenuDropdownButton text="Semináře pro veřejnost" />
          <MenuDropdownButton text="Mezinárodní Středoškolský Moot Court" />
        </div>
      )}
      {showMenu.four && (
        <div>
          <MenuDropdownButton text="Vše na jednom místě" />
          <MenuDropdownButton text="Databáze hodin" />
          <MenuDropdownButton text="Aktivity a sborníky" />
          <MenuDropdownButton text="Simulované soudy" />
          <MenuDropdownButton text="Testy" />
          <MenuDropdownButton text="Filmy a videa" />
        </div>
      )}
    </div>
  )
}

export default MenuContainer
