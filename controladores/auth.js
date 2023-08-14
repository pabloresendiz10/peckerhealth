const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.HOST_MYSQL_LOCAL,
    user: process.env.USUARIO_MYSQL_LOCAL,
    password: process.env.PASSWORD_MYSQL_LOCAL,
    database: process.env.DB_MYSQL_LOCAL
});

exports.registrarse = (req,res) => {
    console.log(req.body);

    const { nombre, usuario, correo, password, confirmarPassword } = req.body;

    db.query("SELECT correo FROM usuarios WHERE correo = ?", [correo], async (error, resultados) =>{
        if(error){
            console.log(error);
        }
        if(resultados.length > 0){
            return res.render("registrarse", {
                message: "El correo ya esta en uso"
            })
        }else if(password !== confirmarPassword){
            return res.render("registrarse", {
                message: "Las contraseñas deben ser iguales"
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query("INSERT INTO usuarios SET ?", {nombre: nombre, usuario: usuario, correo: correo, password: hashedPassword}, (error, resulatdos)=>{
            if(error){
                console.log(error);
            }else{
                console.log(resultados);
                return res.render("registrarse", {
                    message: "Usuario registrado"
                }); 
            }
        })
    });

   
}   