import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/firebaseConfig';
import { User } from 'firebase/auth';
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return { user, loading };
};

export default useAuth;
