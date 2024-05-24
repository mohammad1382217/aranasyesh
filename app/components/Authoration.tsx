// Authorized.js
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserService from '../api/fetchAccount';
import { AccountData } from '../api/Slices/UserSlice/userReducer';

let is_admin = false;

const Authorized: React.FC<children> = ({ children }) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData: AccountData = await UserService.getUserData();
        is_admin = userData.results[0]?.permission?.is_owner
      } catch (error) {
        console.error('Error fetching user data:', error);
        // handle error, e.g., redirect to login page
      }
    };

    fetchData();
  }, []);

  if (is_admin) {
    return <>{children}</>;
  } else {
    return <Navigate to="/Home" replace />;
  }
};

export default Authorized;


// types
interface children {
  children: React.ReactNode;
}