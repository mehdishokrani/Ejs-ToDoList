const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js")

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

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
