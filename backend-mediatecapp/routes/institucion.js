const { Router } = require('express')
const router = Router()
const { connection } = require('./../db/mysql')
//connection.connect()

router.get('/instituciones', (req, res) => {
  try {
    connection.query("SELECT * FROM instituciones_educativas", (error, rows, fields) => {
      if (error) {
        res.status(503).json({ mensaje: "Error en el servidor.", error: true, errorDB: error })
      }
      res.json(rows)
    })
  } catch (error) {
    res.status(503).json({ mensaje: "Error en el servidor.", error: true })
  }
})

router.get('/institucion/:id', (req, res) => {
  try {
    const id = req.params.id
    connection.query(`SELECT * 
                      FROM instituciones_educativas
                      WHERE id = ?`, [id])
  } catch (error) {
    res.status(503).json({ mensaje: "Error en el servidor.", error: true })
  }
})

router.put('/institucion/:id', (req, res) => {
  try {
    const id = req.params.id
    const {
      nombre_ie,
      docente_encargado_mt,
      pagina_web,
      direccion,
      foto_ie,
      descripcion_ie,
      telefono_institucional,
      correo_institucional
    } = req.body

    connection.query(`UPDATE instituciones_educativas
                      SET nombre_ie = ?, docente_encargado_mt = ?,
                      pagina_web = ?, direccion = ?, foto_ie = ?, descripcion_ie = ?, telefono_institucional = ?, correo_institucional = ?
                      WHERE id = ?`, [nombre_ie, docente_encargado_mt, pagina_web, direccion, foto_ie, descripcion_ie, telefono_institucional, correo_institucional, id], (error, resulset, fields) => {
      if (error) {
        res.status(502).json({ mensaje: "Error en motor de base de datos." })
      } else {
        res.status(201).json({
          id: id,
          nombre_ie: nombre_ie,
          docente_encargado_mt,
          pagina_web: pagina_web,
          direccion: direccion,
          foto_ie: foto_ie,
          descripcion_ie: descripcion_ie,
          telefono_institucional: telefono_institucional,
          correo_institucional: correo_institucional
        })
      }
    }
    )

    //   console.log(id)
  } catch (error) {
    res.status(502).json({ mensaje: "Error en el servidor." })
  }
})

router.post('/institucion', (req, res) => {
  try {
    const {
      nombre_ie,
      docente_encargado_mt,
      pagina_web,
      direccion,
      foto_ie,
      descripcion_ie,
      telefono_institucional,
      correo_institucional
    } = req.body
    const SQL = `INSERT INTO instituciones_educativas(nombre_ie, docente_encargado_mt, pagina_web, direccion, foto_ie, descripcion_ie, telefono_institucional, correo_institucional)
                  VALUES(?,?,?,?,?,?,?,?)`
    const parametros = [nombre_ie, docente_encargado_mt, pagina_web, direccion, foto_ie, descripcion_ie, telefono_institucional, correo_institucional]
    connection.query(SQL, parametros, (error, results, fields) => {
      if (error) {
        console.log(error)
        res.status(502).json({ mensaje: 'Error ejecutando la consulta.' })
      } else {
        console.log(results)
        res.status(201).json({
          id: results.insertId,
          nombre_ie: nombre_ie,
          docente_encargado_mt: docente_encargado_mt,
          pagina_web: pagina_web,
          direccion: direccion,
          foto_ie: foto_ie,
          descripcion_ie: descripcion_ie,
          telefono_institucional: telefono_institucional,
          correo_institucional: correo_institucional
        })
      }
    })
  } catch (error) {
    res.status(502).json({ mensaje: "Error en el servidor" })
  }
})

router.delete('/institucion/:id', (req, res) => {
  try {
    const { id } = req.params
    const SQL = `DELETE FROM instituciones_educativas WHERE id = ?`
    connection.query(SQL, [id], (error, results, fields) => {
      if (error) {
        res.status(502).json({ mensaje: 'Error ejecutando la consulta' })
      } else {
        if (results.affectedRows > 0)
          res.json({ mensaje: "Registro eliminado" })
        else
          res.json({ mensaje: "El registro no existe" })
      }
    })
  } catch (error) {
    res.status(502).json({ mensaje: "Error en el servidor" })
  }
})


module.exports = router