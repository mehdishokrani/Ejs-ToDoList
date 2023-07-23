const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file
const date = require(__dirname + "/date.js");
const lodash = require('lodash');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//mongoose.connect("mongodb+srv://mehdishokrani:gJvr4WQ2oy9L4Nk4@cluster0.aqwcxsn.mongodb.net/todolistDB");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
  const customeListName = lodash.capitalize(req.params.customeListName);

  List.findOne({ name: customeListName }).then((result) => {
    if (!result) {
      const list = new List({
        name: customeListName,
        items: defaultItems,
      });
      list.save();
      res.redirect("/" + customeListName);
    } else {
      res.render("list", {
        listTitle: customeListName,
        newItem: result.items,
      });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/", (req, res) => {
  let newItem = req.body.newItem;
  const listName = req.body.btn;
  if (newItem != "") {
    const item = new Item({
      name: newItem,
    });

    if (listName === dayOfWeek) {
      item.save();
      res.redirect("/");
    } else {
      List.findOne({ name: listName }).then((result) => {
        result.items.push(item);
        result.save();
        res.redirect("/" + listName);
      });
    }
  }
});

app.post("/delete", (req, res) => {
  const checkedItamID = req.body.checkBox;
  const listName = (req.body.listTitle)
  if (listName === dayOfWeek) {

    Item.findByIdAndRemove(checkedItamID).exec();
    res.redirect("/");
  }else{
    List.findOneAndUpdate({name: listName},{$pull:{items:{_id:checkedItamID}}}).exec()
    res.redirect("/"+listName)
  }
});


// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server started at port ${port}`);
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
