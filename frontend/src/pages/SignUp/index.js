import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import RegisterForm from '../../components/RegisterForm';

const RegisterScreen = () => {

  const navigate = useNavigate();
  const [userName, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSave = async() => { 
    if (!userName|| !email || !password){
      return toast.warn('Por favor, preencha todos os campos');
    }

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
        toast.success("Novo usuário criado com sucesso!");
        setTimeout(() => {
          handleBack();
        }, 2000);
    })
    .catch((error) => {
      if (error.message.includes('409')){
        return toast.error("Já existe um usuário com esse email.");
      }
      toast.error(`Erro ao criar usuário, erro: ${error.message}`);
    });
  };

  const handleBack = () => {
    navigate('/login');
  }

  return (
    <>
    <RegisterForm
      setEmail={setEmail}
      setUserName={setUserName}
      setPassword={setPassword}
      handleSave={handleSave}
      handleBack={handleBack}
    />
    <ToastContainer autoClose={3000} />
    </>
  );
};ToastContainer

export default RegisterScreen;
