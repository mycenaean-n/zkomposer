import styles from "./layout.module.css"
import { WalletConnectModal } from '@walletconnect/modal'
import logo from "./zKubeLogo.svg"

const modal = new WalletConnectModal({
  projectId: 'YOUR_PROJECT_ID',
  chains: ['eip155:1']
})

const URI = "ZKubeApp"

async function openModal () {
  await modal.openModal({
    uri: URI
  })
}

function closeModal () {
  modal.closeModal()
}

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
              <button onClick={() => openModal}>connect wallet</button>
            </div>
          </header>
          {children}
      </div>
  )
}
