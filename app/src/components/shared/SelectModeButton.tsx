'use client';
import { GameMode } from '../../types/Game';

export function SelectModeButton({
  mode,
  onClick,
}: {
  mode: GameMode;
  onClick: () => void;
}) {
  return (
    <button
      className={`btn-transparent border-secondary aspect-square w-2/3 rounded-md shadow-md transition-colors duration-150 hover:shadow-xl md:h-48 md:w-48`}
      onClick={onClick}
    >
      <span className="group-hover:text-primary text-2xl">{mode}</span>
    </button>
  );
}
