const exp = require('express')
const rootAPI = exp.Router()

rootAPI.get('/',(req,res)=>{
    res.send("rootAPI speaking")
})

let users = [
    {
        name:"goutham",
        class:"it-c"
    },
    {
        name:"reddy",
        class:"cse"
    },
    {
        name:"gouth",
        class:"mechanical"
    }
]

rootAPI.get('/users',(req,res)=>{
    res.send(users)
})

module.exports = rootAPI;