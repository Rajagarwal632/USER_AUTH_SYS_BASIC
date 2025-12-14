const  JWT_USER_PASSWORD  = require("../configuration")
function userauth(){
    const token = req.headers.token
    const decoded_data = jwt.verify(token,JWT_USER_PASSWORD)
    if(decoded_data){
        req.userid = decoded_data.userid
        next()
    }
    else{
        res.json({
            msg : "AUTHORIZATION FAILED"
        })
    }
}

module.exports = {
    userauth
}