"use client";
import { Canvas } from "@react-three/fiber";
import { Grid } from "./Grid";
import {
	Dispatch,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from "react";
import { Vector3 } from "three";
import styles from "../styles/puzzle.module.scss";
import { idToMutator } from "../Puzzles";
import { Actions } from "./Actions";

export type PuzzleContextType = {
	remainingFunctions: number[];
	setRemainingFunctions: Dispatch<SetStateAction<number[]>>;
	chosenFunctions: number[];
	setChosenFunctions: Dispatch<SetStateAction<number[]>>;
};

export const PuzzleContext = createContext<PuzzleContextType>({
	remainingFunctions: [],
	setRemainingFunctions: () => {},
	chosenFunctions: [],
	setChosenFunctions: () => {},
});

export function Puzzle({
	startingGrid,
	finalGrid,
	availableFunctions,
}: {
	startingGrid: number[][];
	finalGrid: number[][];
	availableFunctions: number[];
}) {
	const [grids, setGrids] = useState<number[][][]>([]);
	const [chosenFunctions, setChosenFunctions] = useState<number[]>([]);
	const [remainingFunctions, setRemainingFunctions] =
		useState<number[]>(availableFunctions);

	let xGap = 10 / (availableFunctions.length + 1);
	let xPos = -5;
	const gridElements = grids.map((grid, index) => {
		xPos += xGap;
		return <Grid key={index} grid={grid} position={{ x: xPos, y: 0, z: 0 }} />;
	});

	useEffect(() => {
		setGrids([]);
		const mutatedGrids: number[][][] = [];
		chosenFunctions.forEach((functionId, index) => {
			if (index == 0) {
				const grid = idToMutator[functionId](startingGrid);
				mutatedGrids.push(grid);
			} else {
				const grid = idToMutator[functionId](mutatedGrids[index - 1]);
				mutatedGrids.push(grid);
			}
		});
		setGrids(mutatedGrids);
	}, [chosenFunctions]);

	return (
		<PuzzleContext.Provider
			value={{
				remainingFunctions,
				setRemainingFunctions,
				chosenFunctions,
				setChosenFunctions,
			}}>
			<div className={styles.Puzzle}>
				<div className={styles.canvasContainer}>
					<Canvas
						className={styles.canvas}
						orthographic
						camera={{
							position: new Vector3(0.5, 0.5, 1),
							left: -10,
							right: 10,
							top: 10,
							bottom: -10,
							zoom: 60,
							near: -20,
							far: 20,
						}}>
						<ambientLight intensity={Math.PI} />1
						<Grid grid={startingGrid} position={{ x: -5, y: 0, z: 0 }} />
						{gridElements}
						<Grid grid={finalGrid} position={{ x: 5, y: 0, z: 0 }} />
					</Canvas>
				</div>
				<Actions />
			</div>
		</PuzzleContext.Provider>
	);
}
