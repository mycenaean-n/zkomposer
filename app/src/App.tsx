import { useEthers } from "@usedapp/core";
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

function App() {
  const { account } = useEthers();
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
