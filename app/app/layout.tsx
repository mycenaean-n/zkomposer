import './globals.css';
import { Roboto } from 'next/font/google';
import { Web3Provider } from 'providers/Web3Provider';
import { BlockProvider } from 'context/BlockContext';
import { PageFooter } from '../src/components/PageFooter';
import { Header } from '../src/components/header/Header';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${roboto.className} flex min-h-svh flex-col`}>
        <Web3Provider>
          <BlockProvider>
            <Header />
            <main className="container mx-auto flex-grow">{children}</main>
            <PageFooter />
          </BlockProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
