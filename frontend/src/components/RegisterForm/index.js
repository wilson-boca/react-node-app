import React from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const RegisterForm = ({ setUserName, setEmail, setPassword, handleSave }) => {

  return (
    <div className="flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Card title="TaskFlow Cadastro" style={{ width: '35vh' }}>
          <div className="p-fluid">
          <div className="p-field">            
              <label htmlFor="username">Nome</label>
              <InputText 
                id="name" 
                type="text" 
                autocomplete="on"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="p-field">            
              <label htmlFor="username">E-mail</label>
              <InputText 
                id="username" 
                type="text" 
                autocomplete="on"
                onChange={(e) => setEmail(e.target.value)}
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
              label="Salvar" 
              text raised 
              style={{ marginTop: '10px' }}
              onClick={handleSave}
            />
          </div>

      </Card>
    </div>
  )
};

export default RegisterForm;