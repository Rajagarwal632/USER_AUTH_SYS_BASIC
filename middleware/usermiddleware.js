const { JWT_USER_PASS } = require(process.env.JWT_USER_PASS)
function userauth(){
    const token = req.headers.token
    const decoded_data = jwt.verify(token,JWT_USER_PASS)
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