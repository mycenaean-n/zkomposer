'use client'
import { useRef } from 'react'
import styles from './page.module.css'
import { useGrid } from './useGrid'

export default function Game() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useGrid(sceneRef)

  return (
    <div className={styles.gameContainer}>
      <div ref={sceneRef} className={styles.sceneContainer}/>
      <div className={styles.gameUI}>
        <div className={styles.availableFunctions}>

        </div>
        <div className={styles.chosenFunctions}>

        </div>
        <div className={styles.actions}>
          <button>submit solution</button>
        </div>
      </div>
      <div className={styles.footer}>
        <h4>
          Blocks Left
          <br/>
          <span>100</span>
        </h4>
        <h4>
          Score <br/>
          <span>5</span>
        </h4>
      </div>
      
    </div>

      
  )
}
