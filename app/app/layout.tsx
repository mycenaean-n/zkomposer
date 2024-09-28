import { Roboto } from 'next/font/google';
import { Header } from '../src/components/header/Header';
import { PageFooter } from '../src/components/PageFooter';
import { BlockProvider } from '../src/context/BlockContext';
import { ApolloClientProvider } from '../src/providers/ApolloClientProvider';
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
        <ApolloClientProvider>
          <Web3Provider>
            <BlockProvider>
              <Header />
              <main className="container m-auto px-4">{children}</main>
              <PageFooter />
            </BlockProvider>
          </Web3Provider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
