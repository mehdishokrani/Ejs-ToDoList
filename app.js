const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

var items = ["Buy Food","Cook Food","Eat Food"];

var today = new Date();
var option = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

app.post("/", (req, res) => {
  var item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

var dayOfWeek = today.toLocaleDateString("en-US", option);

app.get("/", (req, res) => {
  res.render("list", { DayOfWeek: dayOfWeek, newItem: items });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
