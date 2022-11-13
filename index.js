const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const cookies = require("cookie-parser");
const createError = require("http-errors");
const proxy = require("express-http-proxy");
const path = require("path");
const app = express();

app.use(cors());
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.get("/", (req, res) => res.render("index"));
app.use("/api/v1/auth", proxy('http://localhost:8001'));

app.use(function (req, res, next) {
  next(createError(404));
});

if (process.env.NODE_ENV !== "test" || !module.parent) {
  app.listen(process.env.PORT || 8000, () => console.info("Server is running on port " + process.env.PORT || 5000));
}

module.exports = app;
