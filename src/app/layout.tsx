import type { Metadata } from 'next';

import Header from '@/components/Header';
import Providers from '@/app/lib/Providers';

export const metadata: Metadata = {
  title: 'My STARs',
  description: 'record your STARs with calander',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="ko">
        <body>
          <Header />
          <Providers>
            <>{children}</>
          </Providers>
        </body>
      </html>
    </>
  );
}
