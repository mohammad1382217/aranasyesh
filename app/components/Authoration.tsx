import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../api/authContext';

interface ChildrenProps {
  children: React.ReactNode;
}

const Authorized: React.FC<ChildrenProps> = ({ children }) => {
  const { isAdmin, isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a loader component
  }

  if (isLoggedIn && isAdmin!) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default Authorized;