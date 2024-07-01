import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import secureLocalStorage from 'react-secure-storage';

import Form from "../../components/Project/ProjectForm";
import Grid from "../../components/Project/ProjectList";
import Navbar from "../../components/NavBar";
import {
  Container,
  Title
} from "./styles";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const getData = async() => {
      const data = await secureLocalStorage.getItem('credentials');
      setUserData(data);
      const response = await axios.get(
        "http://0.0.0.0:8000/api/v1/projects",
        {headers:{'Authorization': `Bearer ${data.token}`}});
      setProjects(response.data.sort((a, b) => (a.name > b.name ? 1 : -1)));  
    };
    getData();
  }, []);

  const getProjects = async () => {
    try {
      const response = await axios.get(
        "http://0.0.0.0:8000/api/v1/projects",
        {headers:{'Authorization': `Bearer ${userData.token}`}});
      setProjects(response.data.sort((a, b) => (a.name > b.name ? 1 : -1)));      
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, [setProjects]);

  return (
    <>    
      <Navbar userName={userData ? userData.name : ''} />
      <Container>
        <Title>Manutenção de Projetos</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getProjects={getProjects} />
        <Grid setOnEdit={setOnEdit} projects={projects} setProjects={setProjects} />
      </Container>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default Projects;