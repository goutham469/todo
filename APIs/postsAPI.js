const exp = require('express')
const DBAccessMiddleware = require('../Middlewares/DBAccessMiddleware')
const postsAPI = exp.Router()

postsAPI.get('/',(req,res)=>{
    res.send('<h1>posts API speaking</h1>')
})

postsAPI.post('/create-task',DBAccessMiddleware,async(req,res)=>{
    console.log(req.body);
    
    let response = await req.postsCollection.insertOne(req.body)
    res.send(response)
})


module.exports = postsAPI;