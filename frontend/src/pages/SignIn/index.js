import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import AuthForm from '../../components/AuthForm';

const LoginScreen = ({setIsAuthenticated}) => {

  const navigate = useNavigate();
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()

  const handleButtonClick = async() => { 
    console.log("USER", userName);
    console.log("PASS", password);

    await axios.post('http://0.0.0.0:8000/api/v1/auth/login', { email: userName, password:password}, {headers:{'Content-Type': 'application/json'}})
    .then((response) => {
        console.log(response.data);
        setIsAuthenticated(true);
        secureLocalStorage.setItem('credentials', response.data);
        navigate('/');
    })
    .catch((error) => {
        // TODO adicionar Toastiy para problemas com a conexão
        console.error(error);
    });
  };

  return (
    <AuthForm
      setUserName={setUserName}
      setPassword={setPassword}
      handleButtonClick={handleButtonClick}
    />
  );
};

export default LoginScreen;