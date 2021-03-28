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
var timeNow = new Date();
unixTime = Date.now();
utcTime = Date();
// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
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

/*app.get("/api/timestamp/([0-9])", function (req, res) {
  res.json({ utc: d });
});
*/

var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
