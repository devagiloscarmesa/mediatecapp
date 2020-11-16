const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../db/mysql');

router.get('/', (req, res) => {
     
    mysqlConnection.query('SELECT * FROM modulos ', (err, rows,
      fields) => {
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
      });
});
  

router.get('/modulo/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM modulos WHERE id = ?', [id],
  (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});  
  
  router.post('/nuevo-modulo',(req,res)=>{
  
  const {modulo,modprefi} = req.body;
  let moduloArray = [modulo,modprefi];

  let nuevoModulo = `INSERT INTO modulos(modulo,modprefi) VALUES(?,?)`;
  mysqlConnection.query(nuevoModulo, moduloArray, (err, results,
    fields) => {
    if (err) {
      return console.error(err.message);
    }
    res.json({ message:`Módulo Creado`, })
    });
  });  
  
  router.put('/modulo/:id', (req, res) => {
    const {modulo,modprefi} = req.body;
    const { id } = req.params;
    mysqlConnection.query(`UPDATE modulos SET modulo = ?,modprefi = ?
    WHERE id = ?`, 
    [modulo,modprefi,id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Modulo actualizado'});
      } else {
        console.log(err);
      }
    });
  });
  
router.delete('/modulo/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM modulos WHERE id = ?',
     [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Modulo eliminado!'});
      } else {
        console.log(err);
      }
    });
  });


module.exports = router;