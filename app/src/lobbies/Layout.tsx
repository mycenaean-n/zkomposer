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
            <img src={logo} className={styles.logo}/>
            <div className={styles.walletConnect}>
              <w3m-button/>
            </div>
          </header>
          {children}
      </div>
  )
}
