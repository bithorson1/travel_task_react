import React from 'react';
import { Navigate } from 'react-router-dom';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return <Navigate to="/login" />;
  }

  const payload = parseJwt(token);

  if (!payload) {
    return <Navigate to="/login" />;
  }

  if (role === 'admin') {
    if (payload.is_staff || payload.is_superuser) {
      return children;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  if (role === 'user') {
    if (!(payload.is_staff || payload.is_superuser)) {
      return children;
    } else {
      return <Navigate to="/admin" />;
    }
  }

  return children;
};

export default PrivateRoute;
