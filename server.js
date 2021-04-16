// where your node app starts

// init project
require("dotenv").config();
const ejs = require("ejs");
const path = require("path");
var express = require("express");
var app = express();
const port = process.env.PORT || 4000;
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var jsonParser = bodyParser.json();

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
var timeNow = new Date();
unixTime = Date.now();
utcTime = Date();
// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/whoami", function (req, res) {
  const requestIp = require("request-ip");
  const clientIp = requestIp.getClientIp(req);
  var userAgent = req.headers["user-agent"];
  var userLang = req.headers["accept-language"].split(";")[0];
  /* res.json({ ipaddress: clientIp });*/
  res.json({ ipaddress: clientIp, language: userLang, software: userAgent });
});

app.get("/api/timestamp", function (req, res) {
  res.json({ unix: unixTime, utc: utcTime });
});

app.get("/api/timestamp/:dateTime", function (req, res) {
  let dateTime = req.params.dateTime;

  let parsed = new Date(dateTime);
  let parsedTime = new Date(parsed).getTime();

  let parsedTime2 = dateTime;
  console.log(parsedTime2);
  let parsedTime3 = new Date(parsedTime2);
  if (parsedTime2 > 10000) {
    parsedTimeint = parseInt(dateTime);
    /* if ((dateTime = [/\d{13}/]))*/

    let dateTime2 = req.params.dateTime;
    let dateTime3 = dateTime2.substring(0, 10);
    dateObj = new Date(dateTime3 * 1000);
    utcString = dateObj.toUTCString();
    {
      res.json({ unix: parsedTimeint, utc: utcString });
      /* res.json({ unix: parsedTime, utc: e });*/
    }
  } else {
    if (parsed.toString() !== "Invalid Date") {
      let dateTimeUTC = new Date(dateTime).valueOf();
      let dateTimeUTC2 = new Date(dateTimeUTC).toUTCString();
      /*
      let dateTime2 = req.params.dateTime;
      console.log(dateTime2);
      dateTime4 = JSON.parse(dateTime2);
      let dateTime3 = dateTime2.substring(0, 10);
      console.log(dateTime3);
      dateObj = new Date(dateTime3 * 1000);
      utcString = dateString.toUTCString();
      console.log(utcString);
      time = utcString.slice(-11, -4);*/
      res.json({ unix: dateTimeUTC.valueOf(), utc: dateTimeUTC2 });
    } else {
      res.json({ error: "Invalid Date" });
    }
  }
});

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
/*app.get("/api/timestamp/([0-9])", function (req, res) {
  res.json({ utc: d });
});
*/

app.use(express.static("public"));
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  shortURL: { type: "String", required: true },
  longURL: { type: "String", required: true },
});

const Url = mongoose.model("Url", urlSchema);
app.post("/api/url/", async (req, res) => {
  await Url.create(req.body, (error) => {
    res.redirect("/");
  });
  console.log(req.body);
});

app.get("/api/url/:_id", async (req, res) => {
  console.log("hell0");
  console.log(req.params);
});
app.get("/api/url/", jsonParser, function (req, res) {
  res.sendFile(__dirname + "/views/shorturl.html");
});
app.get("/api/list", jsonParser, async (req, res) => {
  const urls = await Url.find({});
  res.render("list", { urls: urls });
});
/*app.post("/api/url/", function (req, res) {
  console.log("success post");
  //var url = req.body.url;
  res.json({ success: "url" });
});*/

/*var url1 = new Url({ shortURL: "24", longURL: "bbc.co.uk" });
// save model to database
url1.save(function (err, url) {
  if (err) return console.error(err);
  console.log(url.shortURL + " saved to db.");
});
const query = Url.where({ shortURL: "24" });
*/
/*query.findOne(function (err, url) {
  if (err) return handleError(err);
  if (url) {
    console.log(url.shortURL, url.longURL);
    console.log("deleted");
    // doc may be null if no document matched
  }
});
query.deleteOne({ shortURL: "24" });*/
var listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
