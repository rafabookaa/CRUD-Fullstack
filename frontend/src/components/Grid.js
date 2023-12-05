/* eslint-disable no-undef */
import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit} from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 10px #ccc;
  border-radius: 5px;
  margin: 20px 0px;
  word-break: break-all;
  font-size: 1rem;
  text-align: center;
`;

export const Thead = styled.thead`
`;

export const Tr = styled.tr`
`;

export const Th = styled.th`
  
  text-align: center;
  border-bottom: inset;
  padding-bottom: 5px;
`;

export const Td = styled.td`

  padding-top: 15px;
  text-align: center;
  width: ${(props) => (props.width ? props.width : "auto")} 
`;

const Tbody = styled.tbody``;


const Grid = ({ chamados, setChamados, setOnEdit }) => {
  
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  

  const handleDelete = async (id) => {
    await axios
    .delete("http://localhost:8800/" + id)
    .then(({ data }) => {
      const newArray = chamados.filter((chamado) => chamado.id !== id);      
      
      console.log(newArray);        
      setChamados(newArray);
      toast.success(data)
    })
    .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  }

  return (
    <>
    <Table>
      <Thead>
        <Tr>
          <Th>Filial</Th>
          <Th>Operadora</Th>
          <Th>Solicitante</Th>
          <Th>Falha</Th>
          <Th>Chamado</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {chamados.map((item, i) => (
           <Tr key={i}> 
            <Td width="10%">{item.filial}</Td>
            <Td width="15%">{item.operadora}</Td>
            <Td width="20%">{item.solicitante}</Td>
            <Td width="25%">{item.falha}</Td>
            <Td width="20%">{item.chamado}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />              
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
    </>
    
  );
};


export default Grid;



