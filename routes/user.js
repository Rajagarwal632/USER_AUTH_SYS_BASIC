const { usermodel } = require("../config/db")
const { z, email } = require("zod")
const { JWT_USER_PASS } = require(process.env.JWT_USER_PASS)
const { Router } = require("express")
const userrouter = Router()
const bcrypt = require("bcrypt")
const saltround = 10

userrouter.post("/signup" , async function(req,res){
    const reqbody = z.reqbody({
        email : z.string().min(3).email(),
        password : z.string().min(3),
        name : z.string(),
        created_date : z.date 
    })
    const parsedatawithsucess = reqbody.safeparse(req.body)
    if(!parsedatawithsucess.sucess){
        res.json({
            msg : "INCORRECT FORMAT",
            error : parsedatawithsucess.error
        })
        return
    }

    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const created_date = req.body.created_date

    const hashpass = await bcrypt.hash(password,saltround)

    const user = await usermodel.create({
        email, 
        password : hashpass,
        name,
        created_date
    })
    res.json("SIGNED UP SUCESS")
})

userrouter.post("/signin" , async function(req,res){

})

module.exports = {
    userrouter
}


