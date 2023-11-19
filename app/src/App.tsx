import { Proof } from "circuits";
import { useState } from "react";
import "./App.css";
import { GenerateProof } from "./components/GenerateProof";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Lobbies from "./lobbies/Lobbies";
import Game from "./game/Game";

function App() {
  const [ proof, setProof ] = useState<Proof>();
  return (
    <div className="App">
      <h2>Compute a zk proof</h2>
    </div>
  );
}

export default App;
