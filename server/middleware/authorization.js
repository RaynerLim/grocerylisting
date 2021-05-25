//Import
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        //1. Deconstruct token
        const jwtToken = req.header("token");
        //Check if there is a jwt token
        if(!jwtToken) {
            return res.status(403).json("Not Authorized ");
        }
        
        const payload = jwt.verify(jwtToken, process.env.jwtSerect);

        req.user = payload.user;

        next();
    } catch (err) {
        console.error(err.message);
        return res.status(403).json("Not Authorized");
    }
};