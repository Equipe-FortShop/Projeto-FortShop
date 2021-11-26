var Person = require("./public/javascript/user")
var fs = require("fs");
var mysql = require("mysql");
var formidable = require("formidable");
var connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "nYsmY8Rh9G",
  password: "pnRmpx4872",
  database: "nYsmY8Rh9G",
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

app.listen(3000, () => console.log("Aplicação executando na porta 3000!"));
