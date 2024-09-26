import {
  Button as AriaButton,
  ComboBox,
  ComboBoxProps,
  FieldError,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
} from 'react-aria-components';
import { PuzzleSet } from '.';

export function ComboboxSection({
  onChange,
  items,
  error,
  defaultInputValue,
  defaultSelectedKey,
  label,
  ...props
}: {
  onChange: (value: string) => void;
  items: PuzzleSet[];
  error: string | undefined;
  defaultInputValue: string;
  defaultSelectedKey: string;
  label: string;
  props?: ComboBoxProps<object>;
}) {
  return (
    <ComboBox
      className="form-input-container relative w-full"
      defaultItems={items}
      onSelectionChange={(key) => {
        const selectedItem = items.find((item) => item.id === key);
        onChange(selectedItem?.address ?? '');
      }}
      onInputChange={(value) => {
        const selectedItem = items.find((item) => item.name === value);
        onChange(selectedItem?.address ?? value);
      }}
      defaultInputValue={defaultInputValue}
      defaultSelectedKey={defaultSelectedKey}
      {...props}
      allowsCustomValue
    >
      <FieldError />
      <Label className="block flex-[1] text-sm font-medium">{label}</Label>
      <div className="form-input relative">
        <Input className="w-full rounded-md px-2 py-1 text-sm outline-none" />
        <AriaButton className="absolute right-1 top-1/2 -translate-y-1/2">
          <span className="text-black">▼</span>
        </AriaButton>
      </div>
      <Popover className="bg-primary rounded-md">
        <ListBox>
          {(item: PuzzleSet) => (
            <ListBoxItem
              textValue={item.name}
              className="text-secondary cursor-pointer p-2"
              key={item.id}
            >
              <span className="pr-2 text-sm">{item.name}</span>
              <span className="text-xs text-gray-400">{item.address}</span>
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
      {error && (
        <span className="absolute right-0 top-7 text-sm text-red-500">
          {error}
        </span>
      )}
    </ComboBox>
  );
}
