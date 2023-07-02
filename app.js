const express  =require("express")
const bodyParser = require("body-parser")
const port = 3000
const app = express()

var today = new Date();
var currentDay = today.getDay();



app.get("/",(req,res)=>{
    if(today === 6 || today === 0)
    res.send(`Holiday<br> it is ${today.getMonth()}`)
    else{
        res.sendFile(__dirname+"/index.html")
    }
})


app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
})
