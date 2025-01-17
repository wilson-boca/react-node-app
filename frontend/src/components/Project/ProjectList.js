import React, {useRef} from "react";
import axios from "axios";
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit, FaList } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  MyDiv
} from './styles';

const Grid = ({ projects, setProjects, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const data = await secureLocalStorage.getItem('credentials');

    await axios
      .delete(
        `http://0.0.0.0:8000/api/v1/projects/${id}`,
        {headers:{'Authorization': `Bearer ${data.token}`}})
      .then(() => {
        const newArray = projects.filter((project) => project._id !== id);
        setProjects(newArray);
        toast.success("Projeto removido com sucesso!");
      })
      .catch(() => toast.error("Erro ao tentar remover projeto, tente novamente mais tarde."));

    setOnEdit(null);
  };

  const handleTasks = async (item) => {
    navigate(
      '/tasks',{
      state: {
        item: item,
      }
    });
  }

  const isOdd = (num) => { 
    return num % 2;
  }

  return (
    <MyDiv>
    <Table>
      <Thead>
        <Tr>
          <Th>Nome do Projeto</Th>
          <Th>Descrição</Th>
          <Th></Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {projects.map((item, i) => (
          <Tr key={i} bgcolor={isOdd(i) ? "#F5F7F8": null}>
            <Td width="32%">{item.name}</Td>
            <Td width="54%">{item.description}</Td>
            <Td alignCenter width="3%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="3%">
              <FaTrash onClick={() => {
                if (window.confirm('Deseja realmente remover esse projeto com todas as suas Tarefas?')) {
                  handleDelete(item._id);
                }                
                }} />
            </Td>
            <Td alignCenter width="3%">
              <FaList onClick={() => handleTasks(item)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
    </MyDiv>
  );
};

export default Grid;