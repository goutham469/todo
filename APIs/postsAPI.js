const exp = require('express')
const DBAccessMiddleware = require('../Middlewares/DBAccessMiddleware')
const postsAPI = exp.Router()

postsAPI.get('/',(req,res)=>{
    res.send('<h1>posts API speaking</h1>')
})

postsAPI.post('/create-task',DBAccessMiddleware,async(req,res)=>{
    // console.log(req.body);
    
    let response = await req.postsCollection.insertOne(req.body)
    res.send(response)
})

postsAPI.get('/get-tasks-by-name',DBAccessMiddleware,async(req,res)=>{
    if(req.postsCollection)
    {
        let response = await req.postsCollection.find({"username":req.query.username}).toArray()
        // console.log(response)
        // console.log(response.filter(x=>x.deleteTemporary=='false'))
        response = response.filter(x=>x.deleteTemporary=='false')
        res.send(response)
    }
    else{res.send([])}
})


postsAPI.post('/edit-task',DBAccessMiddleware,async(req,res)=>{
    // console.log(req.body); 
    const editItem = req.body.editItem;
    const newName = req.body.newName;
    const editTime = req.body.time

    let response = await req.postsCollection.updateOne({"id":req.body.id},{$set:{[editItem]:newName}})
    req.postsCollection.updateOne({"id":req.body.id},{$set:{lastModifiedOn:editTime}})
    response.editItem = editItem;
    response.newName = newName;

    res.send(response);
})

postsAPI.delete('/delete-task',DBAccessMiddleware,async(req,res)=>{
    // console.log(req.body);

    if(req.body.type == "permanent")
    {
        let response = await req.postsCollection.deleteOne({"id":req.body.id})
        res.send(response)
    }
    else
    {
        let response = await req.postsCollection.updateOne({"id":req.body.id},{$set:{deleteTemporary:'true'}})
        res.send(response)
    }
})
 

module.exports = postsAPI;