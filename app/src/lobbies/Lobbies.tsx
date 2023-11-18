import { ethers } from 'ethers'
import styles from './page.module.css'

const MockLobbies = [
  {
    id: 1,
    player1: "0x84526CB0b3A0765FbD24E9CBb7d08B0FC2216B7a",
    puzzles: "0x84526CB0b3A0765FbD24E9CBb7d08B0FC2216B7a",
    interval: 100,
    stake: ethers.utils.parseEther("1").toString()
  },
  {
    id: 2,
    player1: "0x84526CB0b3A0765FbD24E9CBb7d08B0FC2216B7a",
    puzzles: "0x84526CB0b3A0765FbD24E9CBb7d08B0FC2216B7a",
    interval: 100,
    stake: ethers.utils.parseEther("1").toString()
  }
]

const LobbiesElements = MockLobbies.map((lobby) => 
<tr key={lobby.id} className={styles.lobby}>
  <td>{lobby.id}</td>
  <td>{lobby.player1}</td>
  <td>{lobby.puzzles}</td>
  <td>{lobby.interval}</td>
  <td>{ethers.utils.parseUnits(lobby.stake, "wei").toString()}</td>
  <button>join</button>
</tr>
)

export default function Lobbies() {
  return (
    <div className={styles.lobbies}>
      <h1>Lobbies</h1>
      <div className={styles.createLobby}>
        <button>
          Create a game
        </button>
      </div>
      <table className={styles.availableLobbies}>
      <colgroup span={6}></colgroup>
        <tr>
          <th>ID</th>
          <th>Player 1</th>
          <th>Puzzles</th>
          <th>Interval (blocks)</th>
          <th>Stake</th>
          <th></th>
        </tr>
        {LobbiesElements}
      </table>
    </div>
  )
}
