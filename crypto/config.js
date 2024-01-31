// Configuraremos Crypto y Bcrypt para hacer más segura nuestra app
const secret = crypto.randomBytes(64).toString('hex');
  const hashedSecret = bcrypt.hashSync(secret, 10);