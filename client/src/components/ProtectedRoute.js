import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProtectedRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem('login');
    if (!login) {
      navigate('/login');
    }
  });
  return (
    <div>
      <Navbar
        isLogin={localStorage.getItem('login')}
        username={localStorage.getItem('username')}
      />
      <Component />
    </div>
  );
};

export default ProtectedRoute;
