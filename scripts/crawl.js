const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const url = require('url');

const {URL, label} = require("../config.json");

const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });

if (!fs.existsSync(`../data/${label}`)) {
  fs.mkdirSync(`../data/${label}`);
}

nightmare
  .goto(URL)
  .wait("body")
  .evaluate(() => document.querySelector("body").innerHTML)
  .end()
  .then((response) => {
    fs.writeFile(
      `../data/${label}/${label}_crawlData.json`,
      JSON.stringify(getData(response)),
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Success!");
        }
      }
    );
  });

function getData(html) {
  let data = [];
  const $ = cheerio.load(html);

  $("a").each((i, a) => {
    let link = $(a).attr("href");
    link = url.resolve(URL, link);
    if (link.includes("/questions/")) {
      console.log(link);
      data.push(link);
    }
  });
  return data;
}