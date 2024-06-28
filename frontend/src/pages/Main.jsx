import React, {useState, useEffect} from 'react';
import { Card } from 'primereact/card'
import secureLocalStorage from 'react-secure-storage';

const MainScreen = () => {

  useEffect(() => {
    const getData = async() => {
      const data = await secureLocalStorage.getItem('credentials');
      setUserData(data);
    };
    getData();
  }, []);

  const [userData, setUserData] = useState();

  return (
    <div className="flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Card title={`Usuário logado:${userData?.name}`} style={{ width: '35vh' }}>
      </Card>
    </div>

  );
};

export default MainScreen;