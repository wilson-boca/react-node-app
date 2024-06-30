import React from "react";
import axios from "axios";
import secureLocalStorage from 'react-secure-storage';
import { FaTrash, FaEdit, FaList } from "react-icons/fa";
import { toast } from "react-toastify";
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { format, parseISO } from "date-fns";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
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
    <Table>
      <Thead>
        <Tr>
          <Th>Título</Th>
          <Th>Descrição</Th>
          <Th>Status</Th>
          <Th>Responsável</Th>
          <Th>Data - Hora</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tasks.map((item, i) => (
          <Tr key={i}>
            <Td width="18%">{item.title}</Td>
            <Td width="28%">{item.description}</Td>
            <Td width="10%">{item.status}</Td>
            <Td width="17%">{item.completedBy ? item.completedBy.name : "-"}</Td>
            <Td width="17%">{formatDate(item.completedAt)}</Td>

            <Td alignCenter width="3%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="3%">
              <FaTrash onClick={() => {
                if (window.confirm('Deseja realmente remover essa tarefa?')) {
                  handleDelete(item._id);
                }                
                }} />
            </Td>
            <Td alignCenter width="3%" title={!item.completedBy ? "Clique para concluir" : 'Concluída'}>
              { item.completedBy ?
              <MdOutlineCheckBox />
              :
              <MdOutlineCheckBoxOutlineBlank onClick={() => {  
                if (window.confirm('Deseja realmente completar essa tarefa?')) {
                  handleComplete(item._id);
                }          
              }} />
              }
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;