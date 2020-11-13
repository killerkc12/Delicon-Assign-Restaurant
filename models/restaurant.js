const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    restaurant_name:{
        type:String,
        required:true
    },
    owner_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

mongoose.model("Restaurant",restaurantSchema)