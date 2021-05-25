//Import postgres library
//.Pool allows us to do the db connections
const Pool = require("pg").Pool;

//Connection configuration
const pool = new Pool({
    user: "postgres",
    password: "Joanna163",
    host: "localhost",
    port: 5432,
    database: "grocerylisting"
});
//Export for or files to do db connections
module.exports = pool;
