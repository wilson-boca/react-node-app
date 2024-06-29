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

const Form = ({ getProjects, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const project = ref.current;
      project.name.value = onEdit.name;
      project.description.value = onEdit.description;
      setProjectId(onEdit._id);
    }
  }, [onEdit]);

  const [projectId, setProjectId] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const project = ref.current;

    if (
      !project.name.value ||
      !project.description.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const data = await secureLocalStorage.getItem('credentials');

    if (onEdit) {
      axios
        .put(`http://0.0.0.0:8000/api/v1/projects/${projectId}`, {
          name: project.name.value,
          description: project.description.value,
        },
        {headers:{'Authorization': `Bearer ${data.token}`}})
        .then(() => toast.success("Projeto atualizado com sucesso!"))
        .catch(() => toast.error("Erro ao atualizar, tente novamente mais tarde."));
    } else {
      axios
        .post("http://0.0.0.0:8000/api/v1/projects", {
          name: project.name.value,
          description: project.description.value,
        },
        {headers:{'Authorization': `Bearer ${data.token}`}})
        .then(() => toast.success('Projecto cadastrado com sucesso!'))
        .catch(() => toast.error('Erro ao cadastrar projeto, tente novamente mais tarde.'));
    }

    project.name.value = "";
    project.description.value = "";
    setOnEdit(null);
    getProjects();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Título</Label>
        <Input name="name" />
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