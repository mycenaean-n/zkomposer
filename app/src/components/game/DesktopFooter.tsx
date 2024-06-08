import { FooterDisplayProps } from '../../types/Game';

export function DesktopFooter({
  yourScore,
  blocksLeftThisTurn,
  opponentScore,
  currentRound,
  numberOfRounds,
}: FooterDisplayProps) {
  return (
    <footer className="absolute bottom-0 left-0 right-0 mt-auto flex h-20 bg-black p-2 text-center">
      <div className="flex h-full w-full items-center justify-between p-6 text-white">
        <div className="flex flex-grow basis-0 items-center">
          <h4 className="text-left text-2xl font-bold">
            your score
            <br />
            <span className="text-xl font-normal">{yourScore}</span>
          </h4>
        </div>
        <div className="flex flex-grow basis-0 items-center justify-center">
          <h4 className="text-center text-2xl font-bold">
            blocks left in round {currentRound}
            <br />
            <span className="text-xl font-normal">{blocksLeftThisTurn}</span>
          </h4>
        </div>
        <div className="flex flex-grow basis-0 items-center justify-end">
          <h4 className="text-right text-2xl font-bold">
            opponent score
            <br />
            <span className="text-xl font-normal">{opponentScore}</span>
          </h4>
        </div>
        <div className="flex flex-grow basis-0 items-center justify-end">
          <h4 className="text-right text-2xl font-bold">
            round
            <br />
            <span className="text-xl font-normal">
              {currentRound + ' of ' + numberOfRounds}
            </span>
          </h4>
        </div>
      </div>
    </footer>
  );
}
