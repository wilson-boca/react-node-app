// AppRoutes.js
import React, {useEffect, useState} from 'react';
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

import LoginScreen from './pages/Login';
import MainScreen from './pages/Main';


const AppRoutes = () => {

  const navigate = useNavigate();


  useEffect(() => {
    const doIt = async () => {
      const token = await secureLocalStorage.getItem('credentials');
      console.log("TOKEN", token);
      if (token){
        setIsAuthenticated(true);
        navigate('/');
      }
    };
    doIt();

  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const ProtectedRoute = ({ component: Component, ...rest }) => (
    isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" replace />
  );
  

  return (
    <Routes>
      <Route path="/login" element={<LoginScreen setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path="/" element={<ProtectedRoute component={MainScreen} />} />
    </Routes>
  );
};

export default AppRoutes;
