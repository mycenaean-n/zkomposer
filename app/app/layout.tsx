import { Roboto } from 'next/font/google';
import { Header } from '../src/components/header/Header';
import { PageFooter } from '../src/components/PageFooter';
import { BlockProvider } from '../src/context/BlockContext';
import { Web3Provider } from '../src/providers/Web3Provider';
import './globals.css';

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
      <body>
        <Web3Provider>
          <BlockProvider>
            <Header />
            <main className="container mx-auto flex-grow px-4">{children}</main>
            <PageFooter />
          </BlockProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
