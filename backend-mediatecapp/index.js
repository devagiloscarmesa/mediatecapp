const express = require('express');
const app = express();
const routes = require('./routes/routes');
const modulos = require('./routes/modulos');
const colegios = require('./routes/colegios');

// Ajustes
app.set('port',3000);

// Middlewares
app.use(express.json());

// Routes//
app.use('/api',routes);
app.use('/api/modulos',modulos);
app.use('/api/colegios',colegios);

// Ajustes del servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});