const express = require('express')
const morgan = require("morgan")
	
const app = express();
const actores = require('./routes/actores');
const modulos = require('./routes/modulos');
const colegios = require('./routes/colegios');

// Ajustes
app.set('port',3000);

// Middlewares
app.use(morgan('dev'))
app.use(express.json());

// Routes//
app.use('/api/',actores);
app.use('/api/',modulos);
app.use('/api/',colegios);

// Ajustes del servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});