const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const date = require(__dirname+"/date.js")

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB")

app.set("view engine", "ejs");

const itemsSchema = new mongoose.Schema({
  name: String
})

const Item = mongoose.model("item",itemsSchema) //Creat collection

const item1 = new Item({
  name:"Welcome to your ToDo list"
})
const item2 = new Item({
  name:"Hit + button to add new item"
})
const item3 = new Item({
  name:"<-- Hit this to delete an item"
})

const defaultItems = [item1,item2,item3]

Item.deleteMany({})
  .then(() => {
    Item.insertMany(defaultItems).then(result=>{
      console.log("Document inserted: ",result)
    }).catch(err =>{
      console.error("Error inserting documents: ", err);
    })
  })
  .catch(error => {
    console.error('Error clearing collection:', error);
  });




// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

app.post("/", (req, res) => {
  let item = req.body.newItem;
  if(item != ""){
  if (req.body.btn === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
}
});



app.get("/", (req, res) => {
    const dayOfWeek = date.getDay()
  res.render("list", { listTitle: dayOfWeek, newItem: items });
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newItem: workItems });
});

app.get("/about",(req,res)=>{
    res.render("about")
})

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
