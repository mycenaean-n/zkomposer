import React from 'react';
import { FooterDisplayProps } from '../../types/Game';

export function MobileFooter({
  yourScore,
  blocksLeftThisTurn,
  opponentScore,
  currentRound,
  numberOfRounds,
}: FooterDisplayProps) {
  return (
    <footer className="absolute bottom-0 left-0 right-0 mt-auto flex h-12 bg-black p-2 text-center md:h-20">
      <div className="flex h-full w-full items-center justify-between text-white md:p-6">
        <div className="flex flex-grow basis-0 items-center">
          <h4 className="text-left font-bold md:text-2xl">
            you
            <br />
            <span className="font-normal md:text-xl">{yourScore}</span>
          </h4>
        </div>
        <div className="flex flex-grow basis-0 items-center justify-center">
          <h4 className="text-center font-bold md:text-2xl">
            blocks in round {currentRound}
            <br />
            <span className="text-xl font-normal">{blocksLeftThisTurn}</span>
          </h4>
        </div>
        <div className="flex flex-grow basis-0 items-center justify-end">
          <h4 className="text-right font-bold md:text-2xl">
            opponent
            <br />
            <span className="font-normal md:text-xl">{opponentScore}</span>
          </h4>
        </div>
        <div className="flex flex-grow basis-0 items-center justify-end">
          <h4 className="text-right font-bold md:text-2xl">
            round
            <br />
            <span className="font-normal md:text-xl">
              {currentRound + ' of ' + numberOfRounds}
            </span>
          </h4>
        </div>
      </div>
    </footer>
  );
}
