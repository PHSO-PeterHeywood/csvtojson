let csvToJson = require("convert-csv-to-json");
let express = require("express");

let json = csvToJson.getJsonFromCsv("assets.csv");
let jsonObject = [];

for (let i = 0; i < json.length; i++) {
  let tag = Object.values(json[i])[0].split(",")[0].replaceAll('"', "");
  let name = Object.values(json[i])[0].split(",")[1].replaceAll('"', "");
  let status = Object.values(json[i])[0].split(",")[6].replaceAll('"', "");
  let substate = Object.values(json[i])[0].split(",")[7].replaceAll('"', "");
  let serial = Object.values(json[i])[0].split(",")[5].replaceAll('"', "");
  jsonObject.push({
    name: name,
    status: status == 2 ? "archived" : "active",
    substate: substate,
    tag: tag,
    serial: serial,
  });
}
console.log(jsonObject);
