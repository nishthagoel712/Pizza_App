const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser")
const path = require("path")
const dotenv = require("dotenv")
const PIzzaTypes = require("./model")

dotenv.config({path:"config.env"})

const app = express()
const PORT = process.env.PORT||8080;

//https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
app.use(express.json())
//app.use(express.urlencoded({extended:true}))
app.use(bodyparser.urlencoded({extended:true}))


//https://stackoverflow.com/questions/46024363/what-does-app-usecors-do#:~:text=Calling%20use(cors())%20will,request%20options%20the%20server%20accepts.
app.use(cors())

app.get("/", (req, res) => {
    res.send("Home Page")
})


// app.get("/allpizzas", (req,res)=>{
//     PIzzaTypes.find().then((response)=>{
//         res.status(200).send(response)
//     }).catch((err)=>{
//         res.status(500).send({message:err.message||"Error Occurred while retriving user information"})
//     })
// })

app.get("/allpizzas", async(req,res)=>{
    try{
    const pizzas = await PIzzaTypes.find()
    res.status(200).json(pizzas)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

app.post("/allpizzas", async(req,res)=>{
    try{
    const pizzas = await PIzzaTypes.create(req.body)
    res.status(200).json(pizzas)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

mongoose.connect(process.env.Mongo_URI).then(()=>{
    console.log("Database connected")
    app.listen(PORT, ()=>{
    console.log(`Server is listening on http://localhost:${PORT}`)
})
}).catch((error)=>{
    console.log(error)
})
