// Aquí estarán todas las rutas
//## Endpoints de la API
//- GET /: Página de inicio con formulario de inicio de sesión y enlace al panel de control.
//- POST /login: Endpoint para autenticar y generar un token JWT.
//- GET /dashboard: Panel de control accesible solo con un token JWT válido.
//- POST /logout: Endpoint para cerrar sesión y destruir la sesión.


const {generarToken,verifyToken}=require ("../middlewares/authMiddleware");
const {express,app}=require ("../app");

const rutaHome = app.get("/",(req,res)=>{
    const loginForm=(`
    <a href="/dashboard">Dashboard</a>
    <h1>Pagina de Inicio </h1>
    <fieldset>
    <legend> Login page </legend>
    <form action="/login" method="post">
    
    <label for="username"   placeholder="Nickname" type="text" >Usuario:</label>
    <input type="text"  id="username" required>
<br>
    <label for="contraseña"   placeholder="Passwoord" type="text">Contraseña:</label>
    <input type="text" id="passwoord" required>
    <br>
    <button type="submit">Enviar</button>
    </fieldset>
    </form>
    
    `)
    res.send(loginForm)
})

//App.get de dashboard con verificación de token
const rutaDashboard= app.get('/dashboard', verifyToken, (req, res) => {
  const userId = req.user;
  const user = users.find((user) => user.id === userId);
  if (user) {
    res.send(`<h1>Bienvenido ${user.name} </h1>
  <p> ID ${user.id}</p>
  <p>Username ${user.username} </p>
  <a href="/">Home </a>
  <form action="/logout" method="post">
  <button type="submit">Logout </button>
  </form>
  `);
  } else res.status(401).json({ mensaje: 'usuario no encontrado' });
});

//App.post de logout con  con destrucción de sesision y redirección a Home
const rutaLogout=app.post("/logout",(req,res)=>{
  req.session.destroy();
  res.redirect('/');
})

//app.post de login con redirección a dashboard
const rutaLogin=app.post('/login', (req, res) => {
    const { username, passwoord } = req.body;
    const user = users.find(
      (user) => user.username === username && user.passwoord === passwoord
    );
  
    if (user) {
      const token = generateToken(user);
      req.session.token = token;
      res.redirect('/dashboard');
    } else {
      res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
  });

module.exports={rutaHome,rutaDashboard,rutaLogout,rutaLogin}