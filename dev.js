const exp = require("express")
const app = exp()
const path = require('path')
const rootAPI = require('./rootAPI')
const cors = require('cors')

require('dotenv').config()
let mclient = require('mongodb').MongoClient

app.use(exp.json())
app.use(cors())

console.log("db url  : ",process.env.MONGO_DB_CONNECTION_URL)

mclient.connect(`${process.env.MONGO_DB_CONNECTION_URL}`).then(client =>{
    const DB = client.db('todo_app')

    const usersCollection = DB.collection('users')

    app.set('usersCollection',usersCollection);

    console.log("connected to data base");
}).catch(err=>{
    console.log("error at connecting to mongoDB",err)
})

app.use(exp.static(path.join(__dirname,'build')))


console.log(process.env.REACT_APP_SERVER_BASE_URL)

app.use('/api',rootAPI)

app.get('*',(req,res)=>{
    // console.log(path.join(__dirname,"./build"))
    res.sendFile(path.join(__dirname,"./build"))
    
})
 


app.use((req, res, next) => {
    res.status(404).send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OOPS</title>
</head>
<style>
    body{
        background-color: #3d5e3e;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .buttonerror{
        border: 1px solid rgb(255, 255, 255);
        border-radius: 3px;
        background-color: #3d5e3e;
        font-size: 16px;
        color: rgb(255, 255, 255);
        font-weight: 100;
        padding: 5px;
    }
    .buttonerror:hover{
        background-color: green;
    }
</style>
<body>
    <div style="margin: 50px;padding: 30px;background-color: #365e38;border-radius:10px;">
        <center>
            <img style="width: 100px;" src=""/>
            <p style="font-size: 22px;font-weight: 500;text-align: center;color: red;">404 Error</p>
            <p>Sorry, Page not found.</p>
            <button class="buttonerror" onclick="navigate(event)">back to Home</button>
        </center>
        
    </div>
    <script>
        function navigate(event)
        {
            event.preventDefault()
            window.location.href=""
        }
    </script>
</body>
</html>`);
  });
  



app.listen(5000,()=>{console.log("development server running on port 5000...")})