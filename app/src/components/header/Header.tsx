import { Logo } from '../Logo';
import { ConnectButton } from '../wallet/ConnectButton';

export function Header() {
  return (
    <header className="flex h-10 items-center justify-between bg-black p-6 md:h-16">
      <Logo />
      <ConnectButton />
    </header>
  );
}
