import { Header } from '../src/components/header/Header';
import { PageFooter } from '../src/components/PageFooter';
import { PuzzleContextProvider } from '../src/context/PuzzleContext';
import { ApolloClientProvider } from '../src/providers/ApolloClientProvider';
import { Web3Provider } from '../src/providers/Web3Provider';
import './globals.css';

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
            <PuzzleContextProvider>
              <Header />
              <main className="container m-auto">{children}</main>
              <PageFooter />
            </PuzzleContextProvider>
          </Web3Provider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
