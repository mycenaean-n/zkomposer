import { ZKUBE_PUZZLESET_ADDRESS } from '../../../../config';
import { useLocalStorage } from '../../../../context/LocalStorageContext';
import { Leaderboard } from './Leaderboard';
import { Menu } from './Menu';

export function Sidepanel() {
  const [id] = useLocalStorage('puzzleId', '0');

  return (
    <div className="flex h-full w-72 flex-col gap-6">
      <Menu />
      <Leaderboard puzzleSet={ZKUBE_PUZZLESET_ADDRESS} puzzleId={id} />
    </div>
  );
}
