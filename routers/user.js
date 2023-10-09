const router = require("express").Router();
const { register, login } = require("../controller/user")
const pool = require('../database.js')

//Get & pagination
router.get('/users', (req, res) =>{
    pool.query(
      `SELECT * FROM users ${req.query.limit ? 'LIMIT ' + req.query.limit : ''}`,
      (e, result) => {
        if (e) {
          console.error(e);
          res.status(500).json(e)
        } else {
          res.json(result.rows);
        }
      });
});

router.post("/register", register);

router.post("/login", login); 


module.exports = router;