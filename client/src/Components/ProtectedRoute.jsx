// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }) => {
  const userRole = localStorage.getItem('role');

  if (userRole !== roleRequired) {
    alert('Access Denied');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
