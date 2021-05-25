//"Import express library"
const express = require("express");


//Setup object to use for call express methods
//for server setting
const app = express();

//Declare Middleware
const cors  = require("cors"); 


app.use(express.json({limit: '50mb'})); //for req.body

//get server to use cors library
app.use(cors());

//Routes
//Register & Login routes
app.use("/auth", require("./routes/authrouter"));

//Listing route
app.use("/listing", require("./routes/listing"));

//Add item Route
app.use("/add", require("./routes/add"));
//Routes

//Set Port
const PORT = process.env.PORT || 5000;

//Listen to the port
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
});