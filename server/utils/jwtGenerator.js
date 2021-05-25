//Import jwt token library
const jwt = require("jsonwebtoken");
//Include dotenv use for getting environment variables
require('dotenv').config();

function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    }

    return jwt.sign(payload, process.env.jwtSerect, {expiresIn: "1hr"})
}

module.exports = jwtGenerator;