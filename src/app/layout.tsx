import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import GlobalStyles from '@/styles/GlobalStyle';
import Header from '@/components/Header';
import ClientProvider from '@/components/ClientProvier';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My STARs',
  description: 'record your STARs with calander',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GlobalStyles />
      <html lang="ko">
        <ClientProvider>
          <body className={inter.className}>
            <Header />
            {children}
          </body>
        </ClientProvider>
      </html>
    </>
  );
}
