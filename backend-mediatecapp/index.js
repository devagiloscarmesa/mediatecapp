const express = require('express')
const morgan = require("morgan")
const multer = require('multer');
const path = require('path');
var cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const app = express();
const estudiante = require('./routes/estudiante');
const actor = require('./routes/actor');
const modulo = require('./routes/modulo');
const institucion = require('./routes/institucion');
require('dotenv').config()

// Ajustes
app.set('port',process.env.PORT || 5000);
//Multer Middlwares

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
//app.use(multer({storage}).single('imagen_perfil'));

// Routes//
app.use('/api/',actor);
app.use('/api/',estudiante);
app.use('/api/',modulo);
app.use('/api/',institucion);

app.get('/', (req, res) => res.send('<h1>Media Técnica App</h1>'))

// Ajustes del servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});