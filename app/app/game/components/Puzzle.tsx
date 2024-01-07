"use client";
import { createContext, useState } from "react";
import styles from "../styles/puzzle.module.scss";
import { Actions } from "./Actions";
import { PuzzleContext as PuzzleContextType, PuzzleInit } from "@/types/Puzzle";
import { Scene } from "./Scene";

export const PuzzleContext = createContext<PuzzleContextType>({
	initConfig: { startingGrid: [], finalGrid: [], availableFunctions: [] },
	remainingFunctions: [],
	setRemainingFunctions: () => {},
	chosenFunctions: [],
	setChosenFunctions: () => {},
});

export function Puzzle(initConfig: PuzzleInit) {
	const [chosenFunctions, setChosenFunctions] = useState<number[]>([]);
	const [remainingFunctions, setRemainingFunctions] = useState<number[]>(
		initConfig.availableFunctions
	);

	return (
		<PuzzleContext.Provider
			value={{
				initConfig,
				remainingFunctions,
				setRemainingFunctions,
				chosenFunctions,
				setChosenFunctions,
			}}>
			<div className={styles.Puzzle}>
				<Scene />
				<Actions />
			</div>
		</PuzzleContext.Provider>
	);
}
