### src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);

  // If user is logged in, render the child component using <Outlet />
  // Otherwise, redirect to the /login page
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;