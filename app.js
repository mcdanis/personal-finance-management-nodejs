var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/RouteIndex");
var usersRouter = require("./routes/RouteUsers");
var app = express();

const allowedOrigins = ["http://localhost:3000", "http://localhost:3003"];

const options = {
  //   origin: (origin, callback) => {
  //     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error("Not allowed by CORS"));
  //     }
  //   },
  origin: true,
  methods: "GET,POST,DELETE",
};

app.use(cors(options));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("welcome to the api");
});

app.use("/api", indexRouter);
app.use("/api-user", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
