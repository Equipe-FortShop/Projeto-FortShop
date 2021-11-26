var User = require("./public/javascript/User")
var fs = require("fs");
var mysql = require("mysql");
var formidable = require("formidable");
var connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "qqismkt8Tr",
  password: "qwthrBcs9I",
  database: "qqismkt8Tr",
});

const express = require("express");
const app = express();
app.use(express.static("public"));
app.get("/", (req, res) => {
  fs.readFile("public/html/index.html", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

app.post("/formularioRegistro", (req, res) => {
  // Pega os dados do formulário e salva no banco
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) console.error("Erro ao receber os dados");
    let user = new User(fields);
    console.log(`Enviando ${user.email} e ${user.senha}`);
    let query = `INSERT INTO Users (email, senha) VALUES ('${person.email}', '${person.senha}')`;
    connection.connect();
    connection.query(query, (err, result) => {
      if (err) console.error("Erro ao salvar no banco de dados");
    });
    connection.end();
    res.send(`Novo usuário cadastrado: ${user}`);
  });

  // Buscar pessoas
  connection.connect();
  connection.query("SELECT * FROM Users", (error, results, fields) => {
    if (error) console.error("Error on quering process");
    console.log("User: ", new User(results[0]));
  });
  connection.end();
});

app.listen(3000, () => console.log("Aplicação executando na porta 3000!"));