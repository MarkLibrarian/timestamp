// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
app.get("/api/timestamp", function (req, res) {
  res.json({ unix: e, utc: d });
});

/*app.get("/api/timestamp/([a-z])", function (req, res) {
  res.json({ unix: e });
});
app.get("/api/timestamp/([0-9])", function (req, res) {
  res.json({ utc: d });
});
*/
app.get("/api/timestamp/:dateTime", function (req, res) {
  let dateTime = req.params.dateTime;
  console.log(dateTime);
  if (new Date(dateTime) > 0) {
    /* if ((dateTime = [/\d{13}/]))*/
    let parsed = new Date(dateTime);
    let parsedTime = new Date(parsed).getTime();
    let e = new Date(parsed).toLocaleString("en-UK");
    let f = new Date(dateTime).toLocaleString("en-UK");
    let utcDate = dateTime.toUTC;
    console.log(e);
    console.log(f);
    {
      res.json({ unix: parsedTime, utc: e });
    }
  } else {
    let dateTime2 = req.params.dateTime;
    console.log(dateTime2);

    let dateTime3 = dateTime2.substring(0, 10);
    console.log(dateTime3);
    dateObj = new Date(dateTime3 * 1000);
    utcString = dateObj.toUTCString();
    console.log(utcString);
    time = utcString.slice(-11, -4);
    res.json({ unix: dateTime3, utc: utcString });
  } /*else {
    res.json({ unix: e });
  }*/
});
/*app.get("/api/timestamp/([0-9])", function (req, res) {
  res.json({ utc: d });
});
*/

var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
