import { RadioButton } from '../../ui/RadioButton';
import { RadioGroup } from './RadioGroup';

export function IntervalSection({
  changeGameStyle,
}: {
  changeGameStyle: (value: string) => void;
}) {
  return (
    <RadioGroup
      onChange={changeGameStyle}
      label={'Game Style'}
      defaultValue="rapid"
    >
      <RadioButton mode="rapid">
        <span>Rapid</span>
        <span>🚀</span>
      </RadioButton>
      <RadioButton mode="blitz">
        <span>Blitz</span>
        <span>⚡</span>
      </RadioButton>
      <RadioButton mode="bullet">
        <span>Bullet</span>
        <span>🚅</span>
      </RadioButton>
    </RadioGroup>
  );
}
