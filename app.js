const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { MONGOURI } = require('./config/key')
const PORT = process.env.PORT || 5000

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("MongoDB Connected , Yup!!!");
})

require('./models/restaurant')
require('./models/reservation')

app.use(express.json())

app.use(require("./routers/restaurant"))
app.use(require("./routers/reservation"))

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("Server is running on ",PORT)
})