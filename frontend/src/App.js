import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js"
import Grid from "./components/Grid.js"
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import axios from "axios";

// import './App.css';

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

`;

const Title = styled.h2`
text-align: center;
color: #004e9a;
font-weight: 550;
font-size: 36px;
margin: 1rem;
`;

function App() {
  const [idchamados, setChamados] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getChamados = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setChamados(res.data.sort((a, b) => (a.filial > b.filial ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getChamados();
  }, [setChamados]);

  return (
    <>
    <Container>
    <Title>Braspress<strong>Telecom</strong> </Title>
     <Form onEdit={onEdit} setOnEdit={setOnEdit} getChamados={getChamados} /> 
     <Grid setOnEdit={setOnEdit} chamados={idchamados} setChamados={setChamados} />
    </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
