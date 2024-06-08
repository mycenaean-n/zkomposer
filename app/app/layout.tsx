import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import { Web3Provider } from 'providers/Web3Provider';
import { ConnectButton } from '@components/wallet/ConnectButton';
import { BlockProvider } from 'context/BlockContext';
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
      <body className={`${roboto.className} flex min-h-svh flex-col`}>
        <Web3Provider>
          <BlockProvider>
            <header className="flex h-12 items-center justify-between bg-black p-4 md:h-20">
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
