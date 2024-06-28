import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const token = secureLocalStorage.getItem('token');
console.log("AXIOX_TOKEN", token);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 200,
  // headers: {'Authorization': `Bearer ${token}`}
});


const requestService = async ({ action, method, params }) => {    


  const requestParams = {
    method,
    params,
  };

  try {
    const response = await axiosInstance(action, requestParams);
    console.log("RESP", response);
    return response.json();
  } catch (error) {
    console.log('Error: ', error);
    return { error };
  }
};

export const auth = async (params) => {
  const result = await requestService({ params, method: 'post', action: '/api/v1/auth/login' });
  cpnsole.log("RESULT", result);
  return result;
};