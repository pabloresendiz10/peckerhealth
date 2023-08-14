const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: './.env'});


const app = express();

const db = mysql.createConnection({
    host: process.env.HOST_MYSQL_LOCAL,
    user: process.env.USUARIO_MYSQL_LOCAL,
    password: process.env.PASSWORD_MYSQL_LOCAL,
    database: process.env.DB_MYSQL_LOCAL
});


app.use("/web", express.static(path.join(__dirname,"web")));

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.set('view engine', 'ejs');

db.connect((error)=>{
    if(error) {
        console.log("Error al conectarse a MySQL"+error)
    }else{
        console.log("Conectado a MySQL")
    }
});

//Rutas
app.use("/", require("./rutas/pagina"));
app.use("/auth", require("./rutas/auth"));

var port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port)
})