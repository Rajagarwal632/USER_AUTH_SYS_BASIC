const { usermodel } = require("../config/db")
const jwt = require ("jsonwebtoken")
const { z } = require("zod")
const {JWT_USER_PASSWORD }= require("../configuration")
const { Router } = require("express")
const userrouter = Router()
const bcrypt = require("bcrypt")
const saltround = 10
const mongoose = require("mongoose");

userrouter.post("/signup" , async function(req,res){
    const reqbody = z.object({
        email : z.string().min(3).email(),
        password : z.string().min(3),
        name : z.string()
        // dates : z.number
    })
    const parsedatawithsucess = reqbody.safeParse(req.body)
    if(!parsedatawithsucess.success){
        res.json({
            msg : "INCORRECT FORMAT",
            error : parsedatawithsucess.error
        })
        return
    }

    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    // const created_date = req.body.created_date

    const hashpass = await bcrypt.hash(password,saltround)

    // const existuser = usermodel.findOne({
    //     email
    // })
    // if(existuser){
    // res.status(403).json({
    //     msg : "USER EXISTS"
    // })
    // return
    // }
    await usermodel.create({
        email, 
        password : hashpass,
        name,
        // created_date
    })
    res.json("SIGNED UP SUCESS")
})

userrouter.post("/signin" , async function(req,res){
   
    const email = req.body.email
    const password = req.body.password

    const existuser = await usermodel.findOne({
        email
    })
    if(!existuser){
        res.json({
            msg : "USER NOT EXISTS"
        })
        return
    }
    const pass_match = await bcrypt.compare(password,existuser.password)
    if(pass_match){
        const token = jwt.sign({
            userid : existuser._id.toString()
        },JWT_USER_PASSWORD)
        res.json({
            token : token
        })
    }else{
        res.json({
            msg : "INCORRECT PASSWORD"
        })
    }
    

})

module.exports = {
    userrouter
}


