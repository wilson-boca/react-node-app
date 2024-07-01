import React from "react";
import axios from "axios";
import secureLocalStorage from 'react-secure-storage';
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
import TaskItem from "../TaskItem";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  MyDiv
} from './styles';

const Grid = ({ tasks, setTasks, setOnEdit, handleComplete }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    const data = await secureLocalStorage.getItem('credentials');
    await axios
      .delete(
        `http://0.0.0.0:8000/api/v1/tasks/${id}`,
        {headers:{'Authorization': `Bearer ${data.token}`}})
      .then(() => {
        const newArray = tasks.filter((task) => task._id !== id);
        setTasks(newArray);
        toast.success("Tarefa removida com sucesso!");
      })
      .catch(() => toast.error("Erro ao tentar remover tarefa, tente novamente mais tarde."));

    setOnEdit(null);
  };

  const formatDate = (date) => {
    if (!date){
      return "-";
    }
    const newDate = format(parseISO(date), 'dd/MM/yyyy - hh:mm:ss')
    return newDate;
  }

  if (!tasks){
    return;
  }

  return (
    <MyDiv>
    <Table>
      <Thead>
        <Tr>
          <Th>Título</Th>
          <Th>Descrição</Th>
          <Th>Status</Th>
          <Th>Responsável</Th>
          <Th>Data - Hora</Th>
          <Th></Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {tasks.map((item, i) => (
          <TaskItem
            item={item} 
            i={i} 
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleComplete={handleComplete}
          />
        ))}
      </Tbody>
    </Table>
    </MyDiv>
  );
};

export default Grid;