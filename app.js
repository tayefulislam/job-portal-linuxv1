const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// jobs route
const jobsRoute = require("./routes/jobs.route");
//Users Route
const usersRoute = require("./routes/users.route");

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/v1/", jobsRoute);
app.use("/api/v1/user", usersRoute);

module.exports = app;
