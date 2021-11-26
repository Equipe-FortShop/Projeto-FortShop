var User = require("./public/javascript/User");
var forms = require("./public/javascript/validateForm");
var fs = require("fs");
var mysql = require("mysql2");
var formidable = require("formidable");
var alert = require("alert");

var connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "qqismkt8Tr",
  password: "qwthrBcs9I",
  database: "qqismkt8Tr",
});

const express = require("express");
const { text } = require("body-parser");
const app = express();
app.use(express.static(__dirname + "/public/"));
app.get("/", (req, res) => {
  fs.readFile("html/index.html", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

app.post("/formularioRegistro", (req, res) => {
  // Pega os dados do formulário e salva no banco
  let form = new formidable.IncomingForm();
  var dbHasUser = false;
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Erro ao receber os dados");
    } else {
      let user = new User(fields);
      let funcResponse = forms.isUserValid(
        user.email,
        user.senha,
        user.senhaConfirmada
      );

      console.log(`funcResponse = ${funcResponse}`);
      if (funcResponse == true) {
        // Buscar pessoas
        connection.query(
          `SELECT * FROM Users WHERE email = '${user.email}'`,
          (error, results, fields) => {
            console.log(`Resultado recebido: ${results}`);
            if (error) {
              console.error("Error on quering process");
            } else {
              if (results[0] != undefined) {
                dbHasUser = true;
                alert("This email is already in use.");
              }
            }
          }
        );
        console.log(dbHasUser);
        if (dbHasUser == false) {
          console.log(`Enviando ${user.email} e ${user.senha}`);
          let query = `INSERT INTO Users (email, senha) VALUES ('${user.email}', '${user.senha}')`;
          connection.connect();
          connection.query(query, function (err, result) {
            if (err) {
              console.error("Erro ao salvar no banco de dados");
              res.redirect("html/register.html");
            } else {
              console.log(`Novo usuário cadastrado: ${user}`);
              res.redirect("html/login.html");
            }
          });
        } else {
          console.log("Email já cadastrado");
        }
      } else {
        console.log("Usuário inválido");
        alert(funcResponse);
      }
    }
  });
  // connection.end();
});

app.post("/formularioLogin", (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Erro ao receber os dados");
    } else {
      let user = new User(fields);
      console.log(`E-mail: ${user.email}`)
      let funcResponse = forms.isLoginValid(user.email, user.senha);
      if (funcResponse == true) {
        connection.query(
          `SELECT * FROM Users WHERE email = '${user.email}'`,
          (error, results, fields) => {
            console.log(`Resultado recebido: ${results}`);
            if (error) {
              console.error("Error on quering process");
            } else {
              if (results[0] != undefined) {
                res.redirect("html/index.html");
              } else {
                alert("Email or Password are wrong");
              }
            }
          }
        );
      } else {
        alert(funcResponse);
      }
    }
  });
});

app.listen(3000, () => console.log("Aplicação executando na porta 3000!"));
