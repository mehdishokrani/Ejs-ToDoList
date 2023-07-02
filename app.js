const express  =require("express")
const bodyParser = require("body-parser")

const port = 3000
const app = express()

app.set('view engine','ejs')

var today = new Date();
var currentDay = today.getDay();
var dayOfWeek = ""


app.get("/",(req,res)=>{
    switch(currentDay){
        case 0:
            dayOfWeek = "Sunday"
            break
        case 1:
            dayOfWeek = "Monday"
            break
        case 2:
            dayOfWeek = "Tusday"
            break
        case 3:
            dayOfWeek = "Wednesday"
            break
        case 4:
            dayOfWeek = "Thursday"
            break
        case 5:
            dayOfWeek = "Friday"
            break
        case 6:
            dayOfWeek = "Saturday"
            break
        default:
            dayOfWeek = "Wrong Return Value"
            break
    }
    res.render("list",{Today: dayOfWeek})
})


app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
})
