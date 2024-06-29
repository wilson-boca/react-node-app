import React, {useEffect, useState} from 'react';
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProjectsListScreen from './pages/Projects';

const AppRoutes = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const doIt = async () => {
      const token = await secureLocalStorage.getItem('credentials');
      if (token){
        setIsAuthenticated(true);
        navigate('/');
      }
    };
    doIt();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const ProtectedRoute = ({ component: Component, ...rest }) => (
    isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" replace />
  );
  
  return (
    <Routes>
      <Route path="/login" element={<SignIn setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path="/register" element={<SignUp component={SignUp} />} />
      <Route path="/" element={<ProtectedRoute component={ProjectsListScreen} />} />
      <Route path="*" element={<SignIn setIsAuthenticated={setIsAuthenticated}/>} />
    </Routes>
  );
};

export default AppRoutes;
