// Este middleware manejará la generación del token y verificación.

//requiero la variable sessionVariable desde app.js
const {sessionVariable}=require ("../app.js");
const jwt=require("jsonwebtoken");

//generación de token
const generarToken=function generateToken(user) {
    return jwt.sign({ user: user.id }, 'd5q-£=5Lgw10WqDEm1AW~g]+<xI!7,l(YI', {
      expiresIn: '1h',
    });
  }


  //Verificar el Token
  function verifyToken(req, res, next) {
    const token = req.session.token;
    if (!token) {
      return res.status(401).json({ mensaje: 'token no generado' });
    }

    jwt.verify(token, 'd5q-£=5Lgw10WqDEm1AW~g]+<xI!7,l(YI', (err, decoded) => {
        if (err) {
          return res.status(401).json({ mensaje: 'Token invalido' });
        }
        req.user = decoded.user;
        next();
      });
    }


  module.exports={generarToken,verifyToken};