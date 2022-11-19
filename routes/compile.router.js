// setup router
const express = require("express");
const router = express.Router();
const request = require("request");

// setup endpoint compile code java online
router.post("/", function (req, res) {
  var options = {
    method: "POST",
    url: "https://codejudge.geeksforgeeks.org/submit-request",
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "vi,en;q=0.9",
      "content-type": "application/json; charset=UTF-8",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      Referer: "https://ide.geeksforgeeks.org/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: JSON.stringify(req.body),
  };
  request(options, function (error, response, body) {
    console.log(response);
    if (error) throw new Error(error);
    res.send(body);
  });
});

router.get("/result/:submissionId", (req, res) => {
  var options = {
    method: "GET",
    url:
      "https://codejudge.geeksforgeeks.org/get-status/" +
      req.params.submissionId,
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "vi,en;q=0.9",
      "content-type": "application/json; charset=UTF-8",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      Referer: "https://ide.geeksforgeeks.org/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  };
  request(options, function (error, response, body) {
    console.log(response.statusCode);
    if (error) throw new Error(error);
    res.send(body);
  });
});

module.exports = router;
