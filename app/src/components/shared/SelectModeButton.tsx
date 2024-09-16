"use client";

import { GameMode } from "../../types/Game";

export function SelectModeButton(
  { mode, onClick }: {
    mode: GameMode;
    onClick: () => void;
  },
) {
  return (
    <button
      className="btn-transparent h-48 w-48 shadow-md hover:shadow-xl"
      onClick={onClick}
    >
      {mode}
    </button>
  );
}
