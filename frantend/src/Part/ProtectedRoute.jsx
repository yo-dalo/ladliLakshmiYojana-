import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const userAuthToken = Cookies.get('userAuthToken'); // Replace 'authToken' with the cookie name you're using.

  // If no auth token is found, redirect to login
  if (!userAuthToken) {
    return <Navigate to="/login" replace />;
  }

  // If the token exists, allow access to the protected route
  return children;
};

export default ProtectedRoute;
