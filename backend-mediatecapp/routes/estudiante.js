const express = require('express');
const router = express.Router();

const mysqlConnection = require('../db/mysql');

router.get('/estudiantes', (req, res) => {

  mysqlConnection.query('SELECT * FROM actores WHERE tipo_actor_id = 1', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('/estudiante/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM actores WHERE id = ? AND tipo_actor_id = 1',
    [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
});

router.post('/estudiante', (req, res) => {

  const { nombres, apellidos, correo, documento, telefono_celular, fecha_nacimiento,
    institucion_id } = req.body;

  let alumno = [nombres, apellidos, correo, documento, telefono_celular,
    fecha_nacimiento, institucion_id];

  let nuevoAlumno = `INSERT INTO actores(nombres,apellidos,correo,documento,
  telefono_celular,fecha_nacimiento,institucion_id, tipo_actor_id)
                  VALUES(?, ?, ?, ?, ?, ?, ?, 1)`;
  mysqlConnection.query(nuevoAlumno, alumno, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    res.json({ message: `Alumno matriculado`, })
  });
});

router.put('/estudiante/:id', (req, res) => {
  const { nombres, apellidos, correo, documento, telefono_celular,
    fecha_nacimiento, institucion_id } = req.body;
  const { id } = req.params;
  mysqlConnection.query(`UPDATE actores SET nombres = ?,apellidos = ?,
  correo = ?,documento = ?,telefono_celular = ?,fecha_nacimiento = ?,
  institucion_id = ? WHERE id = ? AND tipo_actor_id = 1`,
    [nombres, apellidos, correo, documento, telefono_celular, fecha_nacimiento,
      institucion_id, id], (err, rows, fields) => {
        if (!err) {
          res.json({ status: 'Estudiante actualizado' });
        } else {
          console.log(err);
        }
      });
});

router.delete('/estudiante/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('UPDATE actores SET estado_actor_id = 3 WHERE id = ? AND tipo_actor_id = 1',
    [id], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'Estudiante eliminado!' });
      } else {
        console.log(err);
      }
    });
});

module.exports = router;