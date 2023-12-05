//importando express 
import express from "express";
//importando a função userRoutes
import userRoutes from "./routes/chamados.js";
//importando cors
import cors from "cors";

//jogando pra dentro do app
const app = express()

//serve para criar as rotas 
app.use(express.json())
//para evitar conflitos por estar rodando local
app.use(cors())

//criando rota
app.use("/", userRoutes)

//definindo a porta para execusao 
app.listen(8800)