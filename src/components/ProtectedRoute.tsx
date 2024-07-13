import React from 'react';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // 로딩 상태 처리
  }

  if (!user) {
    return null; // 사용자 인증 상태 확인 후 리다이렉트될 때까지 아무것도 렌더링하지 않음
  }

  return <>{children}</>;
};

export default ProtectedRoute;
