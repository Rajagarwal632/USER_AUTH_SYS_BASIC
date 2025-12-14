const { usermodel } = require("../config/db")
const { z } = require("zod")
const { JWT_USER_PASS } = require(process.env.JWT_USER_PASS)
const { Router } = require("express")
const userrouter = Router()
const bcrypt = require("bcrypt")
const saltround = 10

userrouter.post("/signup" , async function(req,res){

})

userrouter.post("/signin" , async function(req,res){

})

module.exports = {
    userrouter
}


