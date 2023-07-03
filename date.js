//jshint esversion:6
exports.getDay = ()=>{

const today = new Date();
const option = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric"
};
return today.toLocaleDateString("en-US", option);

}