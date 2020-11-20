const { Router } = require("express")
const router = Router()
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const connection = require('../db/mysql')
const faker = require('faker')
const cargador = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../public/uploads'))
        },
        filename: (req, file, cb) => {
            cb(null, uuidv4() + path.extname(file.originalname));
        }
    })
})

router.post('/actor/subir-imagen-perfil', cargador.single('imagen_perfil'), async (req, res) => {
    if (req.file) {
        const { id_actor } = req.body
        const response = await connection.query(`UPDATE actores SET foto_perfil = ? WHERE id = ?`, [JSON.stringify(req.file), id_actor])
        res.json({ mensaje: "El archivo fue cargado exitosamente", archivo: { ruta: 'uploads/' + req.file.filename } })
    } else {
        res.json({ mensaje: "El archivo no se cargo" })
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
    connection.query('SELECT * FROM actores WHERE id = ?',
        [id], (err, rows, fields) => {
            if (!err) {
                res.json(rows[0]);
            } else {
                console.log(err);
            }
        });
});

router.put('/actor/recuperar-credenciales', async(req, res) => {
    try {
        let {
            correo
        } = req.body
        
        let response = await connection.query(`SELECT * FROM actores WHERE correo = ?`, [correo])
        if(response[0]) {
            let contrasena = faker.internet.password()
            response = await connection.query(`UPDATE actores SET contrasena = SHA1(?) WHERE id = ?`, [contrasena,response[0].id])
            if(response.affectedRows > 0)
                res.json({mensaje : "Credenciales actualizadas.", contrasena : contrasena})
            else
                res.json({mensaje : "No se actualizaron las credenciales. Algo salio mal."})
        }else{
            res.json({mensaje : "Este actor no existe en la base de datos."})
        }
        
    } catch (error) {
        console.log(error)
        res.status(503).json({ mensaje: "Error en el servidor.", error: true })
    }
})

router.post('/actor/iniciar-sesion', (req, res) => {
    try {
        let {
            correo,
            contrasena
        } = req.body
        const SQL = `SELECT * FROM actores WHERE Correo = ? AND contrasena = SHA1(?)`
        const DATA = [correo, contrasena]
        connection.query(SQL, DATA, (error, result, field) => {
            if (error) {
                res.status(500).json({ mensaje: "se presento un error en la base de datos" })
            } else {
                if (result.length > 0)
                    res.json({ mensaje: 'Login exitoso', usuario: result[0], login: true })
                else
                    res.json({ mensaje: 'Login fallido', login: false })
            }
        })
    } catch (error) {
        res.status(503).json({ mensaje: "Error en el servidor.", error: true })
    }
})

router.post('/estudiante', (req, res) => {

    const { nombres, apellidos, correo, documento, telefono_celular, fecha_nacimiento,
        institucion_id, tipo_actor_id } = req.body;

    let alumno = [nombres, apellidos, correo, documento, telefono_celular,
        fecha_nacimiento, institucion_id, tipo_actor_id];

    let nuevoAlumno = `INSERT INTO actores(nombres,apellidos,correo,documento,
    telefono_celular,fecha_nacimiento,institucion_id, tipo_actor_id)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
        connection.query(nuevoAlumno, alumno, (err, results, fields) => {
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
    connection.query(`UPDATE actores SET nombres = ?,apellidos = ?,
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
    connection.query('UPDATE actores SET estado_actor_id = 3 WHERE id = ?',
        [id], (err, rows, fields) => {
            if (!err) {
                res.json({ status: 'Actor Retirado' });
            } else {
                console.log(err);
            }
        });
});

module.exports = router