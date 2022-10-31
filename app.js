const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/html/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // JSON data
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  // main mailchimp endpoint: https://usX.api.mailchimp.com/3.0
  const url = "https://us8.api.mailchimp.com/3.0/lists/78d3e9282d";

  const options = {
    method: "POST",
    auth: "daniel1:aa7a635faf2f2f49a659c091ac3cc482-us8",
  };

  //host data to external resource
  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});

// mailchimp API key
// aa7a635faf2f2f49a659c091ac3cc482-us8

//audience ID
// 78d3e9282d
