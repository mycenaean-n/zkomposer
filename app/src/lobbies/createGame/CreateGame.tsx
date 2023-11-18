import styles from "./createGame.module.css"


export function CreateGame({setInactive} : {setInactive: () => void}) {
    return (
        <div className={styles.createGame}>
            CreateGame
            <div >

            </div>
            <button onClick={() => setInactive()}>
                cancel
            </button>
        </div>
    )
}