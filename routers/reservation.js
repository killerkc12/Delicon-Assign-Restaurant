const { response } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Reservation = mongoose.model("Reservation")

router.post('/addReservation',requireLogin,(req,res)=>{
    const {customer_name,customer_mobile,customer_email,customer_address,table_number,reserved_date} = req.body
    if(!customer_name || !customer_mobile|| !customer_email || !customer_address || !table_number || !reserved_date){
        return res.status(422).json({error:"All Fields are Mandatory!"})
    }

    Reservation.findOne({table_number:table_number})
    .then(savedTable=>{

            Reservation.findOne({reserved_date:reserved_date})
            .then(savedDate=>{

                if(savedTable && savedDate){
                    return res.status(422).json({error:"Table is reserved already on same Schedule"})
                }else {
                    req.restaurant.password = undefined
                    const reservation = new Reservation({
                        customer_name,
                        customer_mobile,
                        customer_email,
                        customer_address,
                        table_number,
                        reserved_date,
                        reservedBy:req.restaurant
                    })
        
                    reservation.save()
                    .then(result=>{
                        res.json(result)
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                }
            })
    })
})

router.delete('/deleteReservation/:id',requireLogin,(req,res)=>{
    Reservation.findOne({_id:req.params.id})
    .populate("ReservedBy","_id")
    .exec((err,reserve)=>{
        if(err || !reserve){
            return res.status(422).json({error:err})
        }
        reserve.remove()
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

router.get('/myReservation',requireLogin,(req,res)=>{
    Reservation.find({reservedBy:req.restaurant._id})
    .then(reservations=>{
        res.json(reservations)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/allReservation',requireLogin,(req,res)=>{
    Reservation.find()
    .then(reservations=>{
        res.json(reservations)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/getReservation/:id',requireLogin,(req,res)=>{
    Reservation.findOne({_id:req.params.id})
    .then(reservation=>{
        res.json(reservation)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/editReservation/:id',(req,res)=>{
    // const {customer_name,customer_mobile,customer_email,customer_address,table_number,reserved_date} = req.body
    Reservation.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },(error,data)=>{
        if(error){
            console.log(error)
        }else{
            res.json(data)
            console.log(data)
        }
    })
    
})

module.exports = router