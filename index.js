const express = require("express");
const { userController } = require("./Controllers/authentication");
const { employeeController } = require("./Controllers/employee");
const { connection } = require("./db");
const cors = require("cors");
const { UserModel } = require("./models/userModel");
const { authentication } = require("./AuthMiddleware");

const app = express();

app.use(cors())
app.use(express.json())



app.use("/user",userController)

app.use(authentication)

app.use("/employee",employeeController)

app.get("/",(req,res)=>{
    res.send("Hello")
})

// app.use("/employee",employeeController);

app.listen(8000,async()=>{
    try{
    await connection;
    console.log("App is connected to MongoDB");
    }catch(err){
        console.log(err);
    }
    console.log("App is running on port 8000")
})