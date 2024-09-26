import { Button } from './Button'; // Assuming you have a Button component

interface RadioButtonGroupProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function RadioButtonGroup({
  options,
  value,
  onChange,
}: RadioButtonGroupProps) {
  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <Button key={option} onClick={() => onChange(option)}>
          {option}
        </Button>
      ))}
    </div>
  );
}
