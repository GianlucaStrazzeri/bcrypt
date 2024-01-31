// Añadiremos nuestro servidor, session y uniremos el resto de la aplicación

//Requiero librerias y variables desde routes/users.js
const {rutaHome, rutaDashboard, rutaLogout,rutaLogin}=require ("./routes/users.js");

const express =require("express");//Requiero libreria
const app=express();//inicializo express

//requiero libreria para manejar sesión interna de express
const session=require("express-session");

//session: defino una constante que utilizaré en todas las rutas como middleware con app.use
//defino un secreto , defino el resave en falso para que no reinicialize el guardado por cada petición,
//pongo el saveUninitialized en true si estuviera en false y fuera la primera vez que el usuario se crea no guardaría
//la sesión al no ser que modificara   

const sessionVariable=app.use(
    session({
      secret: 'd5q-£=5Lgw10WqDEm1AW~g]+<xI!7,l(YI',
      resave: false,
      saveUninitialized: true,
      coockie: { secure: false },
    })
  );



//escucho puerto
app.listen(3000,()=>{
    console.log(`Express escuhando en el puerto http://localhost/3000`)
})

module.exports={sessionVariable,express, app};