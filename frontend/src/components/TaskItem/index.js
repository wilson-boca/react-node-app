import React from 'react'
import { format, parseISO } from "date-fns";
import { FaTrash, FaEdit, FaList } from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import {
  Tr,
  Td
} from './styles';

const TaskItem = ({item, i, handleEdit, handleDelete, handleComplete}) => {

  const formatDate = (date) => {
    if (!date){
      return "-";
    }
    const newDate = format(parseISO(date), 'dd/MM/yyyy - hh:mm:ss')
    return newDate;
  }

  const isOdd = (num) => { 
    return num % 2;
  }

  return (
    <Tr key={i} bgcolor={isOdd(i) ? "#F5F7F8": null}>
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
  )
}

export default TaskItem;
