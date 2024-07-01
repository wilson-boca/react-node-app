import React from "react";
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';

import {
    Nav,
    Button,
    Title
} from "./styles";

const Navbar = ({ userName='Unknown', showBack=false}) => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    await secureLocalStorage.removeItem('credentials');
    navigate('/login'); 
  }

  const handleBack = async () => {
    await navigate('/projects'); 
  }

  return (
        <>
            <Nav>
              <Title>Usuário: {userName}</Title>
              <div>
              {showBack && <Button onClick={handleBack}>VOLTAR</Button>}
              <Button onClick={handleLogout}>LOGOUT</Button>
              </div>
            </Nav>
        </>
    );
};

export default Navbar;