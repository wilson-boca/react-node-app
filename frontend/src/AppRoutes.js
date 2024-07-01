import React, {useEffect, useState } from 'react';
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProjectsListScreen from './pages/Projects';
import TasksListScreen from './pages/Tasks';

const AppRoutes = () => {


  useEffect(() => {
    const doIt = async () => {
      const data = await secureLocalStorage.getItem('credentials');
      if (data){
        setIsAuthenticated(true);
      }
    };
    doIt();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<SignIn setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/register" element={<SignUp component={SignUp} />} />
        <Route path="*" element={<SignIn setIsAuthenticated={setIsAuthenticated}/>} />
      </Routes>
    );
  }
    
  return (
    <Routes>
      <Route path="/tasks" element={<TasksListScreen />} />
      <Route path="/register" element={<SignUp component={SignUp} />} />
      <Route path="/projects" element={<ProjectsListScreen/>} />    
      <Route path="/login" element={<SignIn setIsAuthenticated={setIsAuthenticated}/>} />  
      <Route path="*" element={<ProjectsListScreen/>} />      
    </Routes>
  );
};

export default AppRoutes;
