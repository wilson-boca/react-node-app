import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import secureLocalStorage from 'react-secure-storage';
import {
  FormContainer,
  InputArea,
  Input,
  Label,
  Button
} from './styles'

const Form = ({ getTasks, onEdit, setOnEdit, projectId }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const task = ref.current;
      task.title.value = onEdit.title;
      task.description.value = onEdit.description;
      setId(onEdit._id);
    }
  }, [onEdit]);

  const [id, setId] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = ref.current;

    if (
      !task.title.value ||
      !task.description.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const data = await secureLocalStorage.getItem('credentials');

    if (onEdit) {
      await axios
        .put(`http://0.0.0.0:8000/api/v1/tasks/${id}`, {
          title: task.title.value,
          description: task.description.value,
        },
        {headers:{'Authorization': `Bearer ${data.token}`}})
        .then(() => toast.success("Tarefa atualizada com sucesso!"))
        .catch(() => toast.error("Erro ao atualizar, tente novamente mais tarde."));
    } else {
      await axios
        .post(`http://0.0.0.0:8000/api/v1/projects/${projectId}/tasks`, {
          title: task.title.value,
          description: task.description.value,
        },
        {headers:{'Authorization': `Bearer ${data.token}`}})
        .then(() => toast.success('Tarefa cadastrada com sucesso!'))
        .catch(() => toast.error('Erro ao cadastrar tarefa, tente novamente mais tarde.'));
    }

    task.title.value = "";
    task.description.value = "";
    setOnEdit(null);
    getTasks();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Título</Label>
        <Input name="title" />
      </InputArea>
      <InputArea>
        <Label>Descrição</Label>
        <Input name="description"/>
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;