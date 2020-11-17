const express = require('express')
const morgan = require("morgan")
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const app = express();
const estudiante = require('./routes/estudiante');
const actor = require('./routes/actor');
const modulo = require('./routes/modulo');
const institucion = require('./routes/institucion');

// Ajustes
app.set('port',process.env.PORT || 5000);

//Multer Middlwares
/*
const storage = multer.diskStorage({
  //Creamos la carpeta si no existe
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => cb(null, uuidv4() + path.extname(file.originalname))
}); */

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
//app.use(multer({storage}).single('imagen_perfil'));

// Routes//
app.use('/api/',actor);
app.use('/api/',estudiante);
app.use('/api/',modulo);
app.use('/api/',institucion);

// Ajustes del servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});