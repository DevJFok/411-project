const puppeteer = require('puppeteer');
const URL = 'https://www.amazon.com';
var item = 'Mobile Phones';
const selectors = {
    search : '#nav-search-submit-button',
    searchbox : '#twotabsearchtextbox',
    product : '[class = "a-size-medium a-color-base a-text-normal" ]',
};

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(URL,{
    timeout: 3000000
  });
  await page.type(selectors.searchbox, item);
  await page.click(selectors.search);
  await page.waitForSelector(selectors.product);
  const product = await page.$$(selectors.product);
  await product[3].click();
  console.log(page.url());
})()