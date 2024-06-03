import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import { Web3Provider } from '../src/providers/Web3Provider';
import { ConnectButton } from '../src/components/wallet/ConnectButton';
import { BlockProvider } from '@/src/context/BlockContext';
import Logo from '../src/components/Logo';
import { PageFooter } from '../src/components/PageFooter';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'zKubes',
  description: 'Zero-Knowledge puzzle game inspired by Cube Composer game.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} flex min-h-screen flex-col`}>
        <Web3Provider>
          <BlockProvider>
            <header className="flex h-20 items-center justify-between bg-black p-4">
              <Logo />
              <ConnectButton />
            </header>
            <main className="flex-grow">{children}</main>
            <PageFooter />
          </BlockProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
