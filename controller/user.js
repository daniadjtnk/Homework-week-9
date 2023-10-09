const db = require ("../database");
const { signToken } = require("../helper/signToken");

const register = (req, res) => {
    const { id, email , gender, password, role } = req.body;

    const query =
    "INSERT into users (id, email , gender, password, role) VALUES ($1, $2, $3, $4, $5)";

    db.query(query, [id, email , gender, password, role], (e, result)=>{
        if (e){
            return res.status(500).json(e);
        }
        return res.json({ message: "User successfully registered"});
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    const query=
    "SELECT id, email, role FROM users WHERE email=$1 AND password=$2";

    db.query(query, [email, password], (e, result)=>{
        if(e){
            return res.status(500).json(e);
        }
        console.log(result.rows[0])
        const token = signToken(result.rows[0])

        return res.json({token});
    });
};

module.exports = { register, login };

