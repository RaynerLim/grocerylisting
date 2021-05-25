//Get express router functionalities
const router = require("express").Router();
//Get db connection functionalities
const pool = require("../db");
//import bcrypt
const bcrypt = require("bcrypt");
//import jwtGenerator
const jwtGenerator = require("../utils/jwtGenerator");
//Import infor validation middleware
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//Register route
router.post("/register", validInfo, async(req, res) => {
    try {
        //1. De-construct req.body received (name, email, password)
        const { name, email, password } = req.body;

        //2. Check if user exist (if exist, throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if (user.rows.length !== 0) {
            return res.status(401).json("User already Exist")
        }

        //3. Else Bcrypt password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. Enter user into database
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",[name, email, bcryptPassword]);

        //5. Generating our jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token});

    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Login route
router.post("/login", validInfo, async (req, res) => {
    try {
        //1. Deconstruct the req.body
        const {email, password} = req.body;

        //2. Check if user exist(if not throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if (user.rows.length === 0){
            return res.status(401).json("Password or Email is incorrect");
        }

        //3. Check if incoming password is the same as database password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if(!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }

        //4. Provide the jwt token if validPassword is true
        const token = jwtGenerator(user.rows[0].user_id);

        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Get authentication status
router.get("/is-verify", authorization, async(req, res) => {
    try{
        res.json(true)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;