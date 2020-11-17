const { Router } = require("express")
const router = Router()
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const connection = require('../db/mysql')

const cargador = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'))
      }, 
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
      }
    })
})

router.post('/actor/cargaimagen-perfil', cargador.single('imagen_perfil'), async(req, res) => {
    if (req.file) {
        res.json({ mensaje: 'Imagen cargada', archivo: req.file })
    } else {
        res.json({ mensaje: 'Imagen no cargada' })
    }
})

router.get("/actores", (req, res) => {
    connection.query('SELECT * FROM actores', (error, rows, fields) => {
        if (!error) {
            res.json(rows)
        } else {
            res.json({ error: "Error ejecutando la consulta" })
        }
    })
})

router.get("/actores/filtro", (req, res) => {
    try {
        const nombre = req.query.nombre
        const SQL = `SELECT a.*, td.descripcion tipo_doc
                FROM actores a
                INNER JOIN tipo_documento td ON a.tipo_documento = td.codigo
                WHERE a.nombres LIKE ? OR a.apellidos LIKE ?`
        connection.query(SQL, [`%${nombre}%`, `%${nombre}%`], (errors, results, fields) => {
            if (errors) {
                res.status(500).json({ mensje: "error en la consulta" })
            } else {
                res.status(200).json(results)
            }
        })
    } catch (error) {
        res.status(502).json({ mensaje: "Error en el servidor." })
    } finally {

    }
})

router.get('/actor/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM actores WHERE id = ?',
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
        institucion_id, tipo_actor_id } = req.body;

    let alumno = [nombres, apellidos, correo, documento, telefono_celular,
        fecha_nacimiento, institucion_id, tipo_actor_id];

    let nuevoAlumno = `INSERT INTO actores(nombres,apellidos,correo,documento,
    telefono_celular,fecha_nacimiento,institucion_id, tipo_actor_id)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
    mysqlConnection.query(nuevoAlumno, alumno, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
        res.json({ message: `Alumno matriculado`, })
    });
});

router.put('/actor/:id', (req, res) => {
    const { nombres, apellidos, correo, documento, telefono_celular,
        fecha_nacimiento, institucion_id, estado_actor_id, tipo_actor_id } = req.body;
    const { id } = req.params;
    mysqlConnection.query(`UPDATE actores SET nombres = ?,apellidos = ?,
    correo = ?,documento = ?,telefono_celular = ?,fecha_nacimiento = ?,
    institucion_id = ?, estado_actor_id = ?, tipo_actor_id = ? WHERE id = ?`,
        [nombres, apellidos, correo, documento, telefono_celular, fecha_nacimiento, , institucion_id, estado_actor_id, tipo_actor_id, id], (err, rows, fields) => {
            if (!err) {
                res.json({ status: 'Actor actualizado' });
            } else {
                console.log(err);
            }
        });
});

router.delete('/actor/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('UPDATE actores SET estado_actor_id = 3 WHERE id = ?',
        [id], (err, rows, fields) => {
            if (!err) {
                res.json({ status: 'Actor Retirado' });
            } else {
                console.log(err);
            }
        });
});


module.exports = router