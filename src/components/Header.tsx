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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  const handleLogin = async () => {
    if (loading) return;

    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError.code !== 'auth/cancelled-popup-request') {
        console.log(firebaseError);
      }
    } finally {
      setLoading(false);
    }

    if (!loading) router.push('/star/new');
  };
  return (
    <HeaderContainer>
      <Link href="/">My STARs</Link>
      {user ? (
        <UserInfo>
          <Link href={`/star/${user.uid}`}>
            <UserName>{user.displayName}</UserName>
          </Link>
          <Button onClick={handleLogout}>Logout</Button>
        </UserInfo>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
    </HeaderContainer>
  );
};

export default Header;
