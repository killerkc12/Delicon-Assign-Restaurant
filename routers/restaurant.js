const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Restaurant = mongoose.model("Restaurant")
const bcrypt = require('bcryptjs')
const {JWT_SECRET} = require('../config/key')
const jwt = require('jsonwebtoken')

router.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"All Fields are Mandatory!"})
    }

    Restaurant.findOne({email:email})
    .then(savedRestaurant=>{
        if(!savedRestaurant){
            return res.status(422).json({error:"Email or Password is Invalid"})
        }

        bcrypt.compare(password,savedRestaurant.password)
        .then(passMatch=>{
            if(!passMatch){
                return res.status(422).json({error:"Email or Password is Invalid"})
            }

            const token = jwt.sign({_id:savedRestaurant._id},JWT_SECRET)
            const {_id,restaurant_name,owner_name,email,address} = savedRestaurant
            res.json({token,restaurant:{_id,restaurant_name,owner_name,email,address}})
        })
        .catch(err=>{
            console.log(err)
        })

    })
    .catch(err=>{
        console.log(err)
    })



})

router.post('/register',(req,res)=>{
    const {restaurant_name,owner_name,email,address,password} = req.body
    if(!restaurant_name || !owner_name || !email || !address || !password){
        return res.status(422).json({error:"All Fields are Mandatory!"})
    }

    Restaurant.findOne({email:email})
    .then((AlreadyEmail)=>{
       if(AlreadyEmail){

        return res.status(422).json({error:"Account is already exist with this Email"})
       }else{

        bcrypt.hash(password,12)
        .then((hashedPassword)=>{

            const restaurant = new Restaurant({restaurant_name,owner_name,email,address,password:hashedPassword})

            restaurant.save()
            .then(restaurant=>{
                res.json({message:"Registered Successfully!"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })

       }

    })
    .catch(err=>{
        console.log(err)
    })

})

module.exports = router