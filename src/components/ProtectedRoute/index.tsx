// @ts-ignore
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/auth" />;
};
export default ProtectedRoute;
