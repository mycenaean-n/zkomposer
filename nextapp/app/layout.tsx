import type { Metadata } from 'next'
import './globals.css'
import styles from "./layout.module.css"
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

import { Web3ModalProvider } from "./context/Web3Modal";

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
      <Web3ModalProvider>
        <header className={styles.header}>
            <h1>zKubes</h1>
            <div className={styles.walletConnect}>
              <w3m-button/>
            </div>
          </header>
          {children}
      </Web3ModalProvider>
      </body>
    </html>
  )
}
