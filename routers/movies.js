const router = require("express").Router();
const { authentication } = require("../middleware/auth");
const pool = require('../database.js')

//Get & pagination
router.get('/movies', (req, res) =>{
    pool.query(
      `SELECT * FROM movies ${req.query.limit ? 'LIMIT ' + req.query.limit : ''}`,
      (e, result) => {
        if (e) {
          console.error(e);
          res.status(500).json(e)
        } else {
          res.json(result.rows);
        }
      });
});

router.post('/movies', (req,res)=>{
  pool.query(
    `INSERT INTO movies ("id", "title", "genres","year") VALUES ($1, $2, $3, $4)`,
    [req.body.id, req.body.title, req.body.genres, req.body.year],
    (e, result) => {
      if (e) {
        console.error(e);
        res.status(500).json(e)
      }
      res.status(201).json({status: 'success'});
    }
  )
});

router.put('/movies/:id', authentication, (req, res)=>{
  pool.query(
    `UPDATE movies SET genres = '${req.body.genres}' WHERE id = ${req.body.id}`,
    (e, result) => {
      if (e){
        console.error(e);
        res.status(500).json(e)
      }
      res.status(201).json({status: 'success'});
    }
  )
});

router.delete('/movies/:id', authentication, (req, res)=>{
  pool.query(
    `DELETE FROM movies WHERE id = ${req.params.id}`,
    (e, result) => {
      if (e){
        console.error(e);
        res.status(500).json(e)
      }
      res.status(201).json({status: 'success'});
    }
  );
});


module.exports = router;