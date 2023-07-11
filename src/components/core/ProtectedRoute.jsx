import { Navigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const token = localStorage.getItem('x-token');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
