import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import { Web3Provider } from '../src/providers/Web3Provider';
import { ConnectButton } from '../src/components/wallet/ConnectButton';
import { ApolloClientProvider } from '../src/providers/ApolloClientProvider';
import { GamesProvider } from '@/src/context/GamesContext';
import { BlockProvider } from '@/src/context/BlockContext';
import Logo from '../src/components/Logo';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'zKubes',
  description: 'Zero-Knowledge Cube Composer game.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} flex min-h-screen flex-col`}>
        <ApolloClientProvider>
          <Web3Provider>
            <BlockProvider>
              <GamesProvider>
                <header className="flex h-20 items-center justify-between bg-black p-4">
                  <Logo />
                  <ConnectButton />
                </header>
                {children}
              </GamesProvider>
            </BlockProvider>
          </Web3Provider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
