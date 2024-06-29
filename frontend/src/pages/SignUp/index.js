import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RegisterForm from '../../components/RegisterForm';

const RegisterScreen = () => {

  const navigate = useNavigate();
  const [userName, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSave = async() => { 

    const body = {
      "name": userName,
      "email": email,
      "password": password
    }
    await axios.post(
      'http://0.0.0.0:8000/api/v1//auth/register', 
      body, 
      {headers:{'Content-Type': 'application/json'}})
    .then((response) => {
        console.log(response.data);
        navigate('/');
    })
    .catch((error) => {
        // TODO adicionar Toastiy para problemas com a conexão
        console.error(error);
    });
  };

  return (
    <RegisterForm
      setEmail={setEmail}
      setUserName={setUserName}
      setPassword={setPassword}
      handleSave={handleSave}
    />
  );
};

export default RegisterScreen;
