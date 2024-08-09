const exp = require("express")
const app = exp()
const path = require('path')
const rootAPI = require('./rootAPI')


app.get('/',(req,res)=>{
    res.send("<h1>Server Speaking !</h1>")
})

app.use('/api',rootAPI)



app.listen(4000,()=>{console.log("server running on port 4000...")})