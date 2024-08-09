const exp = require('express')
const DBAccessMiddleware = require('../Middlewares/DBAccessMiddleware')
const usersAPI = exp.Router()

usersAPI.get('/',(req,res)=>{
    res.send("usersAPI speaking")
})

usersAPI.post('/create-user',DBAccessMiddleware,async(req,res)=>{
    console.log(req.body);  

    let response =  await req.usersCollection.insertOne(req.body);
    res.send(response) 

})

usersAPI.post('/login',DBAccessMiddleware,async(req,res)=>{
    console.log(req.body);

    let response = await req.usersCollection.find({"username":req.body.username}).toArray()
    // console.log(response)
    if(response.length == 0)
    {
        // signup operation
        if(req.body.typeLogin == "manual")
        {
            let signup_response = await req.usersCollection.insertOne({
                username:req.body.username,
                typeLogin:req.body.typeLogin,
                password:req.body.password,
                dateCreated:req.body.dateCreated,
                total:0,
                inComplete:0,
                completed:0,
                profilePic:'',
                high_security_key:String(Math.floor(Math.random()*10000+1))+String(Math.floor(Math.random()*10000+1)),
                history:[]
            })
            console.log(req.body)
            if(signup_response.acknowledged == true)
            {
                res.send({status:"success",message:"new account, welcome to TO-DO APP.Enjoy using the application"})
            }
            else
            {
                res.send({status:"failed",message:"Sorry to tell ,account creation FAILED."})
            }
        }
        else if(req.body.typeLogin == "googleAuth")
        {
            let signup_response = await req.usersCollection.insertOne({
                username:req.body.username,
                typeLogin:req.body.typeLogin,
                dateCreated:req.body.dateCreated,
                total:0,
                inComplete:0,
                completed:0,
                profilePic:'',
                high_security_key:String(Math.floor(Math.random()*10000+1))+String(Math.floor(Math.random()*10000+1)),
                history:[]
            })
            console.log(req.body)
            if(signup_response.acknowledged == true)
            {
                res.send({status:"success",message:"new account, welcome to TO-DO APP.Enjoy using the application"})
            }
            else
            {
                res.send({status:"failed",message:"Sorry to tell ,account creation FAILED."})
            }
        }
    }
    else
    {
        // login operation
        response = response[0]
        if(req.body.typeLogin == "manual")
        {
            if(response.password == req.body.password)
            {
                res.send({status:"success",message:"login success"})
            }
            else
            {
                res.send({status:"failed",message:"incorrect password"})
            }
        }
        else if(req.body.typeLogin == "googleAuth")
        {
            res.send({status:"success",message:"login success"})
        }
    }
})

usersAPI.get('/get-all-users',DBAccessMiddleware,async(req,res)=>{
    if(req.usersCollection)
    {
        let response = await req.usersCollection.find().toArray();
        res.send(response)
    }
    else
    {
        res.send([])
    }
})

usersAPI.delete('/delete-user',DBAccessMiddleware,async(req,res)=>{
    let response = await req.usersCollection.deleteOne({username:req.body.username})
    res.send(response)
})

module.exports = usersAPI;