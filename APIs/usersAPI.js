const exp = require('express')
const usersAPI = exp.Router()

usersAPI.get('/',(req,res)=>{
    res.send("usersAPI speaking")
})

module.exports = usersAPI;