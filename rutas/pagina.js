const express = require("express");
const ruta = express.Router();

ruta.get("/", (req,res)=>{
    res.render("inicio");
});

ruta.get("/registrarse", (req,res)=>{
    res.render("registrarse")
});

ruta.get("/login", (req,res)=>{
    res.render("login")
});

ruta.get("/servicios", (req,res)=>{
    res.render("servicios")
});

ruta.get("/logout", (req,res)=>{
    res.redirect("/")
});

ruta.get("/nosotros", (req,res)=>{
    res.render("nosotros")
});

ruta.get("/contactanos", (req,res)=>{
    res.render("contactanos")
});

module.exports = ruta;
