const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { JWT_SECRET } = require('../config/key')
const Restaurant = mongoose.model('Restaurant')

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error1:"you must logged in first"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error2:"you must logged in first"})
        }
        const {_id} = payload
        Restaurant.findById(_id)
        .then(restaurantdata=>{
            req.restaurant = restaurantdata
            next()
        })
    })
}