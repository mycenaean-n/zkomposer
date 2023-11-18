'use client'
import { useRef } from 'react'
import styles from './page.module.css'
import { useGrid } from './useGrid'

export default function Game() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useGrid(sceneRef)

  return (
      <div ref={sceneRef} className={styles.sceneContainer}>
      </div>
  )
}
