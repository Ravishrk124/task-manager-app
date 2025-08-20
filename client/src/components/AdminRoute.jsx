import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth);

  // Check if user is logged in AND has the 'admin' role
  return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;