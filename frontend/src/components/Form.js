/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import axios from "axios";
import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form `
display: flex;
width: 40%;
align-items: center;
flex-direction: column;
gap: 10px;
background-color: #004e9a;
color: #fff;
padding: 25px 250px;
border-radius: 5px;
font-size: 18px;
font-weight: 550;

`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;

`;

const Input = styled.input`
  width: 300px;
  padding: 0 8px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 30px;
  font-size: 1rem;
  text-align: center;

`;

const Label = styled.label`
font-size: 18px;`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #d58500;
  color: #fff;
  height: 30px;
  width: 200px;
  font-weight: 550;
  font-size: .8rem;
  margin: 1rem;

`;


const Form = ({ getChamados, onEdit, setOnEdit }) => {
  const ref = useRef();
  useEffect(() => {
    if (onEdit) {
      const registrar = ref.current;

      registrar.filial.value = onEdit.filial;
      registrar.operadora.value = onEdit.operadora;
      registrar.solicitante.value = onEdit.solicitante;
      registrar.falha.value = onEdit.falha;
      registrar.chamado.value = onEdit.chamado;
    }
  }, [onEdit])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrar = ref.current;
    //valida se campo está preenchido
    if (
      !registrar.filial.value  ||
      !registrar.operadora.value  ||
      !registrar.solicitante.value  ||
      !registrar.falha.value  ||
      !registrar.chamado.value 
    ) {
      return toast.warn("Preencha todos os campos!!")
    }

    if (onEdit) {
      await axios
      .put("http://localhost:8800/" + onEdit.idchamados, {
        filial: registrar.filial.value,
        operadora: registrar.operadora.value,
        solicitante: registrar.solicitante.value,
        falha: registrar.falha.value,
        chamado: registrar.chamado.value
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));
    } else {
      await axios
      .post("http://localhost:8800", {
        filial: registrar.filial.value,
        operadora: registrar.operadora.value,
        solicitante: registrar.solicitante.value,
        falha: registrar.falha.value,
        chamado: registrar.chamado.value
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));
    }

    registrar.filial.value = "";
    registrar.operadora.value = "";
    registrar.solicitante.value = "";
    registrar.falha.value = "";
    registrar.chamado.value = "";

    setOnEdit(null);
    getChamados();

  }

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
      <Label>Filial</Label>
      <Input name="filial" />
      </InputArea>
      <InputArea>
      <Label>Operadora</Label>
      <Input name="operadora" />
      </InputArea>
      <InputArea>
      <Label>Solicitante</Label>
      <Input name="solicitante" />
      </InputArea>
      <InputArea>
      <Label>Falha</Label>
      <Input name="falha" />
      </InputArea>
      <InputArea>
      <Label>Chamado</Label>
      <Input name="chamado" />
      </InputArea>

      <Button type="submit">Registrar Chamado</Button>
    </FormContainer>
  );
};

export default Form;