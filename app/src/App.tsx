// import { Proof } from "circuits";
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Lobbies from "./lobbies/Lobbies";
import Game from "./game/Game";
import { Proof } from "./game/zk/hooks/useProof";

function App() {
  const [proof, setProof] = useState<Proof>();
  return (
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
  );
}

export default App;
