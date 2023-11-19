import { Proof } from "circuits";
import { useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./lobbies/Layout";
import Lobbies from "./lobbies/Lobbies";
import Game from "./game/Game";

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'

// 1. Get projectId
const projectId = 'YOUR_PROJECT_ID'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId
})

function App() {
  const [ proof, setProof ] = useState<Proof>();
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Lobbies />}/>
            <Route path="/game/*" element={<Game />} />
          </Routes>
      </BrowserRouter>
      </Layout>
      
    </div>
  );
}

export default App;
