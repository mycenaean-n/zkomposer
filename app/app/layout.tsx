import { Header } from '../src/components/header/Header';
import { PageFooter } from '../src/components/PageFooter';
import { ProofContextProvider } from '../src/context/ProofContext';
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <ApolloClientProvider>
          <Web3Provider>
            <PuzzleContextProvider>
              <ProofContextProvider>
                <Header />
                <main className="container m-auto">{children}</main>
                <PageFooter />
              </ProofContextProvider>
            </PuzzleContextProvider>
          </Web3Provider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
