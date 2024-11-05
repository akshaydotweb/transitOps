import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminPage = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to login page if no token is found
    return <Navigate to="/login" />;
  }

  // Token is present, so display the admin content
  return <h1>Admin Dashboard</h1>;
};

export default AdminPage;
