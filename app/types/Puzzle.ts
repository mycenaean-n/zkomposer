import { Dispatch, SetStateAction } from "react";

export type PuzzleContext = {
	initConfig: PuzzleInit;
	remainingFunctions: number[];
	setRemainingFunctions: Dispatch<SetStateAction<number[]>>;
	chosenFunctions: number[];
	setChosenFunctions: Dispatch<SetStateAction<number[]>>;
};

export type PuzzleInit = {
	startingGrid: number[][];
	finalGrid: number[][];
	availableFunctions: number[];
}