import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import AuthForm from '../../components/AuthForm';

const LoginScreen = ({setIsAuthenticated}) => {

  const navigate = useNavigate();
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()

  const handleButtonClick = async() => { 
    await axios.post('http://0.0.0.0:8000/api/v1/auth/login', { email: userName, password:password}, {headers:{'Content-Type': 'application/json'}})
    .then((response) => {
        setIsAuthenticated(true);
        secureLocalStorage.setItem('credentials', response.data);
        navigate('/projects');
    })
    .catch((error) => {
        toast.error(`Problemas ao se conectar ao servidor, erro: ${error.message}`);
    });
  };

  return (
    <>
    <AuthForm
      setUserName={setUserName}
      setPassword={setPassword}
      handleButtonClick={handleButtonClick}
    />
    <ToastContainer autoClose={3000} />
    </>
  );
};

export default LoginScreen;