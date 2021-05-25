//Get rounting functionalities
const router = require("express").Router();

//DB connection functionalities
const pool = require("../db");
const authorization = require("../middleware/authorization");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "../uploads/");
    },
    filename: function(req, file, cb) {
        cb(null,new Date().toISOString()+ file.originalname);
    }
});

const upload = multer({storage: storage});

//Routing to add
router.get("/", authorization, async (req, res) => {
    try {
        //req.user has the payload 
        //res.json(req.user)

        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1",[
            req.user
        ]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.post("/submit", authorization, async (req, res, next) =>{

    const {photo, product_name, product_desc, product_price, product_quantity  } = req.body;
    var price = product_price;
    price = price.substring(1);
    console.log(photo + " " + product_name  + " " + product_desc  + " " + product_price  + " " + product_quantity);

    const time = new Date().toISOString();


    await pool.query("INSERT INTO groceries (item_picture, item_name, item_desc, item_price, item_qty, created_date) VALUES ($1, $2, $3, $4, $5, $6)",[
        photo,
        product_name,
        product_desc,
        price,
        product_quantity,
        time
    ]);

    const id = await pool.query ("SELECT item_id FROM groceries WHERE created_date = $1",[
        time
    ]);

    res.json(id.rows[0]);
});

module.exports = router;