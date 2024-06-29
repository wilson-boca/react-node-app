import React from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Link } from 'react-router-dom';

const AuthForm = ({ setUserName, setPassword, handleButtonClick }) => {

  return (
    <div className="flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Card title="TaskFlow Login" style={{ width: '35vh' }}>
          <div className="p-fluid">
            <div className="p-field">
            
              <label htmlFor="username">E-mail</label>
              <InputText 
                id="username" 
                type="text" 
                autocomplete="on"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="p-field">
              <label htmlFor="password">Senha</label>
              <InputText 
                id="password" 
                type="password" 
                autocomplete="on"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button 
              label="Entrar" 
              text raised 
              style={{ marginTop: '10px' }}
              onClick={handleButtonClick}
            />
            <Divider />
            <p className="mt-2">Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
          </div>

      </Card>
    </div>
  )
};

export default AuthForm;