const {URL} = require('../config.json');
const fs = require('fs');
const cheerio = require('cheerio');

const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
 
nightmare
  .goto(URL)
  .wait('span.MathJax_PlainSource')
  .evaluate(() => document.querySelector("body").innerHTML)
  .end()
  .then((response) => {
      fs.writeFile(
        './data.json',
        JSON.stringify(getData(response)),
        (err) => {
            if (err) {
            console.log('getData failure:', err);
            } else {
            console.log("Success!");
            }
        });
  })
  .catch(error => {
    console.error('Nightmare failure:', error);
  });

function getData(body) {
    const $ = cheerio.load(body);
    const data = [];
    //for each question, extract data to an object and push object to data
    $('div.question').each((index, element) => {
        const math = $(element).find('span.MathJax_PlainSource').text();
        const marks = $(element).find('div.marks').text();
        const question_part_label = $(element).find('div.question_part_label').text();
        const object = {math, marks, question_part_label};
        console.log(object);
        data.push(object);
    })
    return data;
}