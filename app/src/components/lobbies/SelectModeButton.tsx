'use client';
import { GameMode } from '../../types/Game';
import { Button, ButtonProps } from '../ui/Button';

type SelectModeButtonProps = ButtonProps & {
  mode: GameMode;
};

export function SelectModeButton({
  className,
  mode,
  ...props
}: SelectModeButtonProps) {
  return (
    <Button
      variant="transparent"
      className={`border-secondary aspect-square w-2/3 rounded-md shadow-md transition-colors duration-150 hover:shadow-xl md:h-48 md:w-48`}
      {...props}
    >
      <span className="group-hover:text-primary text-2xl">{mode}</span>
    </Button>
  );
}
