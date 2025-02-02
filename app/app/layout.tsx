import { Header } from '../src/components/header/Header';
import { PageFooter } from '../src/components/PageFooter';
import { ApolloClientProvider } from '../src/providers/ApolloClientProvider';
import { LeaderboardProvider } from '../src/providers/LeaderboardProvider';
import { ProofProvider } from '../src/providers/ProofProvider';
import { PuzzleProvider } from '../src/providers/PuzzleProvider';
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
            <PuzzleProvider>
              <ProofProvider>
                <LeaderboardProvider>
                  <Header />
                  <main className="container m-auto">{children}</main>
                  <PageFooter />
                </LeaderboardProvider>
              </ProofProvider>
            </PuzzleProvider>
          </Web3Provider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
