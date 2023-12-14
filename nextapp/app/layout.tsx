import type { Metadata } from 'next'
import './globals.css'
import styles from "./layout.module.css"
import { Roboto } from 'next/font/google'

import logo from "./zKubeLogo.svg"
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

import Image from 'next/image'

export const metadata: Metadata = {
  title: 'zKubes',
  description: 'Zero-Knowledge Cube Composer game.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <header className={styles.header}>
            <Image src={logo} alt='logo' className={styles.logo}/>
            <div className={styles.walletConnect}>
            </div>
          </header>
          {children}
      </body>
    </html>
  )
}
