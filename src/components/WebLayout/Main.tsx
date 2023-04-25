import { ReactNode } from 'react'

const Main = ({ children }: { children: ReactNode }) => {
  return <main className="w-sl m-auto">{children}</main>
}

export default Main
