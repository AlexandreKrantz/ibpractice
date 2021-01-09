const cheerio = require("cheerio");
const fs = require("fs");
const {URL, label, parent_selector, link_selector, link_prefix} = require("./config.json");
const url = require('url');
const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });

nightmare
  .goto(URL)
  .wait("body")
  .evaluate(() => document.querySelector("body").innerHTML)
  .end()
  .then((response) => {
    fs.writeFile(
      `test.json`,
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
  $("img").each(function(i, image) {
      data.push(url.resolve(URL, $(image).attr('src')));
    });

  return data;
}