//importanto mysql
import mysql from "mysql"

//fazendo a conexão com o banco
export const db = mysql.createConnection({
  host: "localhost",
  user:"root",
  password: "123456",
  database: "crud"
})