'use client';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { Address, isAddress } from 'viem';
import { z } from 'zod';
import { ZKUBE_PUZZLESET_ADDRESS } from '../../../config';
import { useCreteGameCallback } from '../../../hooks/callbacks/useCreateGameCallback';
import { useInputContainerClickCallback } from '../../../hooks/useInputContainerClick';
import { Button } from '../../ui/Button';
import { Modal } from '../../ui/Modal';
import { ComboboxSection } from './ComboboxSection';
import { IntervalSection } from './IntervalSection';
import { TurnsSection } from './TurnsSection';

const turnsMap = {
  small: 3,
  medium: 5,
  large: 10,
} as const;
export type TurnsKeyTypes = keyof typeof turnsMap;

const intervalMap = {
  rapid: 400,
  blitz: 200,
  bullet: 100,
} as const;
export type IntervalKeyTypes = keyof typeof intervalMap;

export type PuzzleSet = {
  id: number;
  name: string;
  address: Address;
};
const puzzleSets: PuzzleSet[] = [
  { id: 1, name: 'Original Set', address: ZKUBE_PUZZLESET_ADDRESS },
] as const;

const gameSettingsValidationSchema = z.object({
  turns: z.enum(Object.keys(turnsMap) as [string, ...string[]]),
  interval: z.enum(Object.keys(intervalMap) as [string, ...string[]]),
  puzzleSet: z.string().refine((val) => isAddress(val), {
    message: 'Invalid Ethereum address',
  }),
});

const gameSettingsTransformationSchema = gameSettingsValidationSchema.transform(
  (data) => ({
    turns: turnsMap[data.turns as TurnsKeyTypes],
    interval: intervalMap[data.interval as IntervalKeyTypes],
    puzzleSet: data.puzzleSet as Address,
  })
);

export type GameSettingsData = z.infer<typeof gameSettingsValidationSchema>;
export type ParsedGameSettingsData = ReturnType<
  typeof gameSettingsTransformationSchema.parse
>;

export function CreateGameModal({
  setIsModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = useState<GameSettingsData>({
    puzzleSet: puzzleSets[0].address,
    interval: 'blitz',
    turns: 'small',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof GameSettingsData, string>>
  >({});
  const onInputContainerClick = useInputContainerClickCallback(setIsModalOpen);
  const router = useRouter();
  const createGameCallback = useCreteGameCallback();

  const changeGameSettings =
    (key: keyof GameSettingsData) => (value: string) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));

      const parsedValue = gameSettingsValidationSchema.shape[key];
      const result = parsedValue.safeParse(value);

      if (result.success) {
        setErrors((prev) => ({
          ...prev,
          [key]: undefined,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: result.error.errors[0].message,
        }));
      }
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validatedData = gameSettingsTransformationSchema.safeParse(formData);

    if (validatedData.success) {
      const parsedData = gameSettingsTransformationSchema.parse(formData);
      const { data, error, success } = await createGameCallback(parsedData);
      // todo: set a new error type
      if (error) {
        setErrors({
          ...errors,
          puzzleSet: error,
        });
        return;
      }
      // todo: replace with id from contract
      if (success) {
        router.push(`/game/${data.gameId}`);
      }
    } else {
      const newErrors: Record<string, string> = {};
      validatedData.error.errors.forEach((error) => {
        const fieldName = error.path[0] as string;
        newErrors[fieldName] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Modal setIsOpen={onInputContainerClick} className="bg-primary">
        <form
          onSubmit={handleSubmit}
          className="flex max-w-full flex-col gap-2 space-y-4"
        >
          <ComboboxSection
            onChange={changeGameSettings('puzzleSet')}
            items={puzzleSets}
            error={errors.puzzleSet}
            defaultInputValue={puzzleSets[0].name}
            defaultSelectedKey={puzzleSets[0].address}
            label="Puzzle Set"
          />
          <TurnsSection changeNumberOfTurns={changeGameSettings('turns')} />
          <IntervalSection changeGameStyle={changeGameSettings('interval')} />
          <Button
            type="submit"
            className="border-secondary text-secondary mx-auto w-40 border-2 text-sm"
            rounded={true}
            variant="transparent"
          >
            Create Game
          </Button>
        </form>
      </Modal>
    </>
  );
}
