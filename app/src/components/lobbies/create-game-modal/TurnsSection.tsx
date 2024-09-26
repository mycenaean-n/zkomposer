import { RadioButton } from '../../ui/RadioButton';
import { RadioGroup } from './RadioGroup';

export function TurnsSection({
  changeNumberOfTurns,
}: {
  changeNumberOfTurns: (value: string) => void;
}) {
  return (
    <RadioGroup
      onChange={changeNumberOfTurns}
      label={'Number of Turns'}
      defaultValue="small"
    >
      <RadioButton mode="small">
        <span>Three</span>
        <span>🐣</span>
      </RadioButton>
      <RadioButton mode="medium">
        <span>Five</span>
        <span>🐥</span>
      </RadioButton>
      <RadioButton mode="large">
        <span>Ten</span>
        <span>🐓</span>
      </RadioButton>
    </RadioGroup>
  );
}
