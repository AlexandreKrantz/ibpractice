const fs = require('fs');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
 
(async () => {
  const browser = await puppeteer.launch({headless: false}); // default is true
  const page = await browser.newPage();
  const html = await page.content();
  await page.goto('https://www.ibdocuments.com/IB%20QUESTIONBANKS/4.%20Fourth%20Edition/questionbank.ibo.org/en/teachers/00000/questionbanks/7-dp-mathematics-hl/questions/120762.html');
  page
  .waitForSelector('.MathJax_MathML')
  .then(() => {
    getData(html);
  })
  await browser.close();
  
})();

function getData(html) {
    console.log(html);
    const $ = cheerio.load(html);
    const data = [];
    $('.question').each((index, element) => {
      console.log(index);
      console.log(element);
    })
    return data;
}