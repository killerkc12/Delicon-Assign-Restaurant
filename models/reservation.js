const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const reservationSchema = new mongoose.Schema({
    customer_name:{
        type:String,
        required:true
    },
    customer_mobile:{
        type:String,
        required:true
    },
    customer_email:{
        type:String,
    },
    customer_address:{
        type:String,
        required:true
    },
    table_number:{
        type:String,
        required:true
    },
    reserved_date:{
        type:String,
    },
    reservedBy:{
        type:ObjectId,
        ref:"Restaurant"
    }
},{
    timestamps:true
})

mongoose.model("Reservation",reservationSchema)