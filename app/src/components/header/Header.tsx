import { Logo } from '../ui/icons/Logo';
import { ConnectButton } from './ConnectButton';

export function Header() {
  return (
    <header className="flex h-10 items-center justify-between bg-black px-2 py-6 md:h-[72px]">
      <Logo />
      <ConnectButton />
    </header>
  );
}
