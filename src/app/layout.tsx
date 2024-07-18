import type { Metadata } from 'next';

import Header from '@/components/Header';
import Providers from '@/app/lib/Providers';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

export const metadata: Metadata = {
  title: 'My STARs',
  description: 'record your STARs with calander',
};
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="ko">
        <body>
          <Providers>
            <>
              <Header />
              {children}
            </>
          </Providers>
        </body>
      </html>
    </>
  );
}
