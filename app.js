const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

let today = new Date();
let option = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

app.post("/", (req, res) => {
  let item = req.body.newItem;
  if (req.body.btn === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

let dayOfWeek = today.toLocaleDateString("en-US", option);

app.get("/", (req, res) => {
  res.render("list", { listTitle: dayOfWeek, newItem: items });
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newItem: workItems });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
