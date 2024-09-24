'use client';
import { Dispatch, SetStateAction } from 'react';

export function CreateGameModal({
  setInputsShowing,
}: {
  setInputsShowing: Dispatch<SetStateAction<boolean>>;
}) {
  // const [puzzleSet, setPuzzleSet] = useState<Address>(ZKUBE_PUZZLESET_ADDRESS);
  // const [interval, setInterval] = useState<number>(200);
  // const [creatingGame, setCreatingGame] = useState(false);
  // const { push } = useRouter();
  // const [numberOfTurns, setNumberOfTurns] = useState<number>(3);
  // const createGameCallback = useCreteGameCallback();

  // function onInputContainerClick(e: React.MouseEvent<HTMLDivElement>) {
  //   if (e.target === e.currentTarget) {
  //     setInputsShowing(false);
  //   }
  // }

  // async function createGameAction() {
  //   if (!createGameCallback || !puzzleSet) return;
  //   setCreatingGame(true);
  //   try {
  //     const result = await createGameCallback(
  //       puzzleSet,
  //       interval,
  //       numberOfTurns
  //     );
  //     if (result && result.success) {
  //       const route = `/game/${result.data?.gameId}`;
  //       push(route);
  //     }
  //     setCreatingGame(false);
  //   } catch (error) {
  //     setCreatingGame(false);
  //   }
  // }

  return (
    <div className="modal" onClick={() => setInputsShowing(false)}>
      <div className="modal-content">
        {/* <div className="modal-input-container gap-2">
          <h4>Puzzle Set</h4>
          <input
            className="modal-input"
            type="text"
            value={puzzleSet}
            onChange={(e) => setPuzzleSet(e.target.value as Address)}
          />
        </div>
        <div className="modal-input-container gap-4">
          <h4>Interval (blocks)</h4>
          <input
            className="modal-input"
            type="number"
            value={interval}
            onChange={(e) => setInterval(parseInt(e.target.value))}
          />
        </div>
        <div className="modal-input-container">
          <div>
            <h4>No. of Puzzles</h4>
          </div>
          <input
            className="modal-input"
            type="number"
            value={numberOfTurns}
            onChange={(e) => setNumberOfTurns(parseInt(e.target.value))}
          />
        </div>
        <Button
          className="mx-auto mt-4 w-40"
          // onClick={createGameAction}
          disabled={creatingGame}
        >
          Create Game
        </Button> */}
      </div>
    </div>
  );
}
