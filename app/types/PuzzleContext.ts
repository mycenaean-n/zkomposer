import { Dispatch, SetStateAction } from "react";

export type PuzzleContext = {
	remainingFunctions: number[];
	setRemainingFunctions: Dispatch<SetStateAction<number[]>>;
	chosenFunctions: number[];
	setChosenFunctions: Dispatch<SetStateAction<number[]>>;
};