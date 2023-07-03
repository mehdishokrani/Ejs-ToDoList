const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

let items = ["Buy Food","Cook Food","Eat Food"];

let today = new Date();
let option = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

app.post("/", (req, res) => {
  let item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

let dayOfWeek = today.toLocaleDateString("en-US", option);

app.get("/", (req, res) => {
  res.render("list", { DayOfWeek: dayOfWeek, newItem: items });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
