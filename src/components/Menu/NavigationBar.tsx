import MenuDropdownGroup from '@/components/Menu/MenuDropdownGroup'
import MenuItem from '@/components/Menu/MenuItem'
import { LinkListType } from '@projectType/componentTypes'
import { signOut, useSession } from 'next-auth/react'

const NavigationBar = () => {
  const { data: session } = useSession()

  const streetlaw: LinkListType[] = [
    { name: 'Co je Street Law', link: 'co-je-street-law' },
    { name: 'Street Law na PF UK', link: 'street-law-na-pf-uk' },
    {
      name: 'Pedagogické minimum na PF UK',
      link: 'pedagogicke-minimum-na-pf-uk',
    },
    { name: 'Historie Street Law', link: 'historie-street-law' },
  ]

  const onas: LinkListType[] = [
    { name: 'Kontakty', link: 'kontakty' },
    { name: 'Náš tým', link: 'nas-tym' },
    { name: 'Mediální ohlasy', link: 'medialni-ohlasy' },
    { name: 'Aktuality', link: 'aktuality' },
    {
      name: 'Projekt Vzdělanější učitelé pro vzdělanější společnost',
      link: 'projekt-vzdelanejsi-ucitele-pro-vzdelanejsi-spolecnost',
    },
    {
      name: 'Pětidenní seminář Street Law: Lidská práva v praxi',
      link: 'petidenni-seminar-street-law-lidska-prava-v-praxi',
    },
  ]

  const conabizime: LinkListType[] = [
    { name: 'Kurzy pro učitele', link: 'kurzy-pro-ucitele' },
    { name: 'Pro školy', link: 'pro-skoly' },
    { name: 'Semináře pro veřejnost', link: 'seminare-pro-verejnost' },
    {
      name: 'Mezinárodní Středoškolský Moot Court',
      link: 'mezinarodni-stredoskolsky-moot-court',
    },
  ]

  const materialy: LinkListType[] = [
    { name: 'Vše na jednom místě', link: 'vse-na-jednom-miste' },
    { name: 'Databáze hodin', link: 'databaze-hodin' },
    { name: 'Aktivity a sborníky', link: 'aktivity-a-sborniky' },
    { name: 'Simulované soudy', link: 'simulovane-soudy' },
    { name: 'Testy', link: 'testy' },
    { name: 'Filmy a videa', link: 'filmy-a-videa' },
  ]

  return (
    <nav className="grow flex bg-white justify-between h-10 items-center shadow-sl">
      {/* Left side */}
      <div className="relative">
        <MenuDropdownGroup linkList={streetlaw} name="Street Law" />
        <MenuDropdownGroup linkList={onas} name="O nás" />
        <MenuDropdownGroup linkList={conabizime} name="Co nabízíme" />
        <MenuDropdownGroup linkList={materialy} name="Materiály" />
      </div>
      {/* Right side */}
      {session && (
        <div className="mr-16">
          {/* on user-role 3+ */}
          <MenuItem path="/add" name="Přidat" />
          {/* on user-role 2+ */}
          <MenuItem path="/settings" name="Nastavení" />
          {/* on user-role 1+ */}
          <MenuItem path="/" name="Odhlásit se" fn={() => signOut()} />
        </div>
      )}
    </nav>
  )
}

export default NavigationBar
