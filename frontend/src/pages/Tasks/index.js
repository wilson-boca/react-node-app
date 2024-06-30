import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import secureLocalStorage from 'react-secure-storage';
import { useLocation } from 'react-router-dom';

import Form from "../../components/Task/TaskForm";
import Grid from "../../components/Task/TaskList";
import {
  Container,
  Title
} from "./styles";

const Tasks = () => {
  const [projects, setProjects] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [userData, setUserData] = useState();

  const location = useLocation();
  let { item } = location.state;

  useEffect(() => {
    const getData = async() => {
      const data = await secureLocalStorage.getItem('credentials');
      setUserData(data);
      const response = await axios.get(
        `http://0.0.0.0:8000/api/v1/projects/${item._id}/tasks`,
        {headers:{'Authorization': `Bearer ${data.token}`}});
      setProjects(response.data.sort((a, b) => (a.name > b.name ? 1 : -1)));  
    };
    getData();
  }, []);

  const getProjects = async () => {
    try {
      const response = await axios.get(
        `http://0.0.0.0:8000/api/v1/projects/${item._id}/tasks`,
        {headers:{'Authorization': `Bearer ${userData.token}`}});
      setProjects(response.data.sort((a, b) => (a.name > b.name ? 1 : -1)));      
    } catch (error) {
      toast.error(error);
    }
  };

  const handleComplete = async (id) => {
    const data = await secureLocalStorage.getItem('credentials');
    await axios
    .put(`http://0.0.0.0:8000/api/v1/tasks/${id}`, {
      status: 'concluída'
    },
    {headers:{'Authorization': `Bearer ${data.token}`}})
    .then(() => {      
      toast.success("Status atualizado com sucesso!");
      getProjects();
    })
    .catch(() => toast.error("Erro ao atualizar status, tente novamente mais tarde."));
  }

  useEffect(() => {
    getProjects();
  }, [setProjects]);

  if (!item){
    return <></>;
  }

  return (
    <>
      <Container>
        <Title>Tarefas do Projeto {item.name} - TaskFlow</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getProjects={getProjects} projectId={item._id} />
        <Grid setOnEdit={setOnEdit} tasks={projects} setTasks={setProjects} handleComplete={handleComplete}  />
      </Container>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default Tasks;