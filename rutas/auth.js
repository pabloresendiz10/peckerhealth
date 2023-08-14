const express = require("express");
const authController = require("../controladores/auth")

const ruta = express.Router();

ruta.post("/registrarse", authController.registrarse )

ruta.get("/login", (req,res)=>{
    res.render("login")
});

module.exports = ruta;