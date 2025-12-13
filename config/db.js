const mongoose = require("mongoogse");


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    email : {type : String , unique : true },
    password : String,
    name : String,
    created_date : Number
})

const usermodel = mongoose.model("user" , user)
module.exports = {
    usermodel : usermodel
}
