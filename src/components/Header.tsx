'use client';

import { useEffect, useState } from 'react';
import 'firebase/auth';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import Button from './Button';
import Link from 'next/link';
import { FirebaseError } from 'firebase/app';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';
import { DefaultSession, Session } from 'next-auth';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f1f1f1;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-right: 10px;
`;

const Header = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  console.log(session, status);

  const handleLogout = async () => {
    signOut();
    router.push('/');
  };

  return (
    <HeaderContainer>
      <Link href="/">My STARs</Link>

      {session?.user ? (
        <UserInfo>
          <Link href={`/star/${session.user.name}`}>
            <UserName>{session.user.name}</UserName>
          </Link>
          <Button onClick={handleLogout}>Logout</Button>
        </UserInfo>
      ) : (
        <Button onClick={() => signIn('google')}>google login</Button>
      )}
    </HeaderContainer>
  );
};

export default Header;
