const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 5000;
const URI = process.env.URI;

mongoose.connect(URI).then(() => {
  console.log("database connected");
});

app.listen(port, () => {
  console.log(port);
});
