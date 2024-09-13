const csvToJson = require("convert-csv-to-json");
const express = require("express");
const fs = require("fs/promises");

let app = express();
let port = 3000;

app.post("/convert", async (req, res) => {
  console.log("New convert request received");
  try {
    let data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });

    req.on("end", async () => {
      if (data.length === 0) {
        res.status(400).send("No file or file is blank");
      } else {
        console.log("Writing temp file for conversion");
        await fs.writeFile("data.csv", Buffer.concat(data), "base64", (e) => {
          if (e) {
            res.status(400).send(e);
          }
        });
        let json = csvToJson.fieldDelimiter(",").getJsonFromCsv("data.csv");
        jsonString = JSON.stringify(json).replaceAll('\\"', "");
        console.log();
        await fs.rm("data.csv");
        res.send(JSON.parse(jsonString));
      }
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port ?? 3000, () => {
  console.log("Server listening on port " + port ?? 3000);
});
