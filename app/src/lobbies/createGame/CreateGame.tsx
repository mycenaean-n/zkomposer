import { useState } from "react";
import styles from "./createGame.module.css";
import { ethers } from "ethers";

type GameConfig = {
  puzzleSet: string;
  interval: number;
  numberOfRounds: number;
  stake: string;
};

export function CreateGame({ setInactive }: { setInactive: () => void }) {
  const defaultPuzzleSet = "0x84526CB0b3A0765FbD24E9CBb7d08B0FC2216B7a";
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    puzzleSet: defaultPuzzleSet,
    interval: 100,
    numberOfRounds: 10,
    stake: ethers.utils.parseEther("0.1").toString(),
  });

  async function createGame(gameConfig: GameConfig) {
    /// call createGame
  }

  return (
    <div className={styles.createGame}>
      <div className={styles.gameModal}>
        <h1>Create Game</h1>
        <h3>Puzzle Set</h3>
        <input
          onChange={(event) =>
            setGameConfig((prev) => ({
              ...prev,
              puzzleSet: event.target.value,
            }))
          }
          value={gameConfig.puzzleSet}/>
        <h3>Stake</h3>
        <input
          onChange={(event) =>
            setGameConfig((prev) => ({
              ...prev,
              stake: ethers.utils.parseEther(event.target.value).toString(),
            }))
          }
          value={ethers.utils.formatUnits(gameConfig.stake, "ether").toString()}        />
        <h3>Interval</h3>
        <input
          onChange={(event) =>
            setGameConfig((prev) => ({
              ...prev,
              interval: Number(event.target.value),
            }))
          }
          value={gameConfig.interval}
        />
        <h3>Number Of Rounds</h3>
        <input
          onChange={(event) =>
            setGameConfig((prev) => ({
              ...prev,
              numberOfRounds: Number(event.target.value),
            }))
          }
          value={gameConfig.numberOfRounds}
        />
        <div className={styles.actions}>
          <button onClick={() => createGame(gameConfig)}>cancel</button>
          <button onClick={() => setInactive()}>cancel</button>
        </div>
        
      </div>
    </div>
  );
}
