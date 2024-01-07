import { useContext, useState } from "react";
import { PuzzleContext } from "./Puzzle";
import { InputSignals, Proof } from "../zk/types";
import { functionMapping } from "../Puzzles";
import styles from "../styles/actions.module.scss";
import { GenerateProof } from "../zk/generateProof";
import { mockInputSignals } from "@/mocks/inputSignals";

export function Actions() {
	const {
		chosenFunctions,
		remainingFunctions,
		setChosenFunctions,
		setRemainingFunctions,
	} = useContext(PuzzleContext);

	const [inputSignals, setInputSignals] =
		useState<InputSignals>(mockInputSignals);
	const [proof, setProof] = useState<Proof | string>();

	const remainingFunctionsElements = remainingFunctions.map(
		(functionId, index) => (
			<button
				key={index}
				onClick={() => {
					setRemainingFunctions((prev) => prev.toSpliced(index, 1));
					setChosenFunctions((prev) => prev.concat(functionId));
				}}>
				{functionMapping[functionId]}
			</button>
		)
	);

	const chosenFunctionsElements = chosenFunctions.map((functionId, index) => (
		<button
			key={index}
			onClick={() => {
				setChosenFunctions((prev) => prev.toSpliced(index, 1));
				setRemainingFunctions((prev) => prev.concat(functionId));
			}}>
			{functionMapping[functionId]}
		</button>
	));

	return (
		<div className={styles.gameUI}>
			<div className={styles.availableFunctions}>
				{remainingFunctionsElements}
			</div>
			<div className={styles.chosenFunctions}>{chosenFunctionsElements}</div>
			<div className={styles.submit}>
				<GenerateProof
					inputSignals={inputSignals}
					onResult={(result) => setProof(result)}
				/>
			</div>
		</div>
	);
}
