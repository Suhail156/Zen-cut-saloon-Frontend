import { Navigate } from 'react-router-dom';

const AdminProtect = ({ children }) => {
  const token = localStorage.getItem('Admin_token');

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtect;
