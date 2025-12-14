require('dotenv').config()
const express = require("express")
const app = express()
const {userrouter} = require("./routes/user")
const {userauth} = require("./middleware/usermiddleware")
app.use(express.json())
const mongoose = require("mongoose")


app.use("/user",userrouter)
async function main(){
    await mongoose.connect(process.env.MONGOOSE_URL)
    app.listen(3000)
    console.log("listening on port 3000")

}
main()