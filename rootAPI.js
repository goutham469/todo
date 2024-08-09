const exp = require('express')
const rootAPI = exp.Router()
const usersAPI = require('./APIs/usersAPI')
const postsAPI = require('./APIs/postsAPI')


rootAPI.get('/',(req,res)=>{
    res.send("rootAPI speaking")
})

rootAPI.use('/user',usersAPI)
rootAPI.use('/posts',postsAPI)

module.exports = rootAPI;