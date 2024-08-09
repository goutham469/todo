const exp = require("express")
const app = exp()
const path = require('path')
const rootAPI = require('./rootAPI')

let mclient = require('mongodb').MongoClient
require('dotenv').config()


mclient.connect(`${process.env.MONGO_DB_CONNECTION_URL}`).then(client =>{
    const DB = client.db('todo_app')

    const usersCollection = DB.collection('users')

    app.set('usersCollection',usersCollection);

    console.log("connected to data base");
}).catch(err=>{
    console.log("error at connecting to mongoDB",err)
})



app.get('/',(req,res)=>{
    res.send("<h1>Server Speaking !</h1>")
})

app.use('/api',rootAPI)



app.listen(4000,()=>{console.log("server running on port 4000...")})