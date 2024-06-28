import React, {useState} from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { useNavigate, Link } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';

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
    <div className="flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Card title="Login" style={{ width: '35vh' }}>
          <div className="p-fluid">
            <div className="p-field">
            
              <label htmlFor="username">Usuário</label>
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
            <p className="mt-2">Não tem uma conta? <Link to="/main">Cadastre-se</Link></p>
          </div>

      </Card>
    </div>

  );
};

export default LoginScreen;