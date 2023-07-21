const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

app.set("view engine", "ejs");

const itemsSchema = new mongoose.Schema({
  name: String,
});

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

const Item = mongoose.model("item", itemsSchema); //Creat collection
const List = mongoose.model("list", listSchema);

const item1 = new Item({
  name: "Welcome to your ToDo list",
});
const item2 = new Item({
  name: "Hit + button to add new item",
});
const item3 = new Item({
  name: "<-- Hit this to delete an item",
});

const defaultItems = [item1, item2, item3];

const dayOfWeek = date.getDay();

app.get("/", (req, res) => {
  
  Item.find({}).then((result) => {
    items = result;
    if (items.length === 0) {
      Item.deleteMany({})
        .then(() => {
          Item.insertMany(defaultItems)
            .then((result) => {
              console.log("Document inserted Successfully");
            })
            .catch((err) => {
              console.error("Error inserting documents: ", err);
            });
        })
        .catch((error) => {
          console.error("Error clearing collection:", error);
        });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: dayOfWeek, newItem: items });
    }
  });
});

app.get("/:customeListName", (req, res) => {
  const customeListName = req.params.customeListName;

  List.findOne({ name: customeListName.toLowerCase() }).then((result) => {
    if(!result){
      const list = new List({
        name: customeListName.toLowerCase(),
        items: defaultItems
      })
      list.save()
      res.redirect("/"+customeListName)
    }else{
      res.render("list", {listTitle: customeListName.toUpperCase(), newItem: result.items })
    }
  });
    

  
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/", (req, res) => {
  let newItem = req.body.newItem;
  const listName = (req.body.btn).toLowerCase()
  if (newItem != "") {
    const item = new Item({
      name: newItem,
    });

    if(listName === dayOfWeek){
      item.save()
      res.redirect("/")
    }else{
      List.findOne({name: listName}).then((result)=>{
        result.items.push(item)
        result.save()
        res.redirect("/"+listName)
      })
    }
    
  }
});

app.post("/delete", (req, res) => {
  const checkedItamID = req.body.checkBox;
  Item.findByIdAndRemove(checkedItamID).exec();
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
