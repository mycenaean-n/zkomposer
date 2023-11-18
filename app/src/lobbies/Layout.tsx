import './globals.css'
import styles from "./layout.module.css"

import logo from "./zKubeLogo.svg"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div>
        <header className={styles.header}>
            <img src={logo}/>
            <div className={styles.walletConnect}>
            </div>
          </header>
          {children}
      </div>
  )
}
