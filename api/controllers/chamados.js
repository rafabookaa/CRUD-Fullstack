import { db } from "../db.js";

export const getChamados = (_, res) => {
  const q = "SELECT * FROM chamados";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

//Registrar chamado
export const addChamado = (req, res) => {
  const q = "INSERT INTO chamados(`filial`, `operadora`, `solicitante`, `falha`, `chamado`) VALUES(?)";

  const values = [
    req.body.filial,
    req.body.operadora,
    req.body.solicitante,
    req.body.falha,
    req.body.chamado,
  ];

  db.query(q, [values], (err) => {
    if(err) return res.json(err);

    return res.status(200).json("Chamado registrado com sucesso!!")
  });
};

//Alterar chamado
export const updateChamado = (req, res) => {
  const q = "UPDATE chamados SET `filial` = ?, `operadora` = ?, `solicitante`= ?, `falha` = ?, `chamado` = ? WHERE `IDCHAMADOS` = ?";

  const values = [
    req.body.filial,
    req.body.operadora,
    req.body.solicitante,
    req.body.falha,
    req.body.chamado,
  ]; 
  
   db.query(q, [...values, req.params.id], (err) => {
    if (err)  return res.json(err);

    return res.status(200).json("Chamado alterado como solicitado!!")
  });
};

//deletar chamado
export const deleteChamado = ((req, res) => {
  const q = "DELETE FROM chamados WHERE `idchamados` = ?";
   
  const id = parseInt(req.params.id);
  
  db.query(q, [id], (err) => {
    if (err) return res.json(err);


    return res.status(200).json("Chamado deletado com sucesso!!")
  });
});