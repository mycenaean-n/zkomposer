import { ReactNode } from 'react';
import {
  RadioGroup as AriaRadioGroup,
  RadioGroupProps,
} from 'react-aria-components';
import { IntervalKeyTypes, TurnsKeyTypes } from '.';

export function RadioGroup({
  onChange,
  label,
  children,
  defaultValue,
  ...props
}: {
  onChange: (value: string) => void;
  label: string;
  children: ReactNode;
  defaultValue: IntervalKeyTypes | TurnsKeyTypes;
  props?: RadioGroupProps;
}) {
  return (
    <div className="form-input-container">
      <label className="block flex-[1] text-sm font-medium">{label}</label>
      <AriaRadioGroup
        className="form-input grid grid-cols-3 gap-2"
        defaultValue={defaultValue}
        onChange={onChange}
        {...props}
      >
        {children}
      </AriaRadioGroup>
    </div>
  );
}
