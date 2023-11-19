import { Proof } from "circuits";
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./lobbies/Layout";
import Lobbies from "./lobbies/Lobbies";
import Game from "./game/Game";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi";

import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet } from "viem/chains";

// 1. Get projectId
const projectId = "YOUR_PROJECT_ID";

// 2. Create wagmiConfig
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

function App() {
  const [proof, setProof] = useState<Proof>();
  return (
    <WagmiConfig config={wagmiConfig}>
      <div className="App">
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Lobbies />} />
              <Route path="/game/*" element={<Game />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </div>
    </WagmiConfig>
  );
}

export default App;
