import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserService from '../api/fetchAccount';
import { AccountData } from '../api/Slices/UserSlice/userReducer';

// types
interface ChildrenProps {
  children: React.ReactNode;
}

const Authorized: React.FC<ChildrenProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // null: loading, false: not admin, true: admin
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData: AccountData = await UserService.getUserData();
        setIsAdmin(userData.results[0]?.permission?.is_owner ?? false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    // While loading user data, you can return a loader or null
    return <div>Loading...</div>; // Or a loader component
  }

  if (isAdmin) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default Authorized;