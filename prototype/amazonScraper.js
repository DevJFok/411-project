// load puppeteer
const puppeteer = require('puppeteer');
const domain = "https://www.amazon.com";
//var items = ['mushroom','apple','banana','grape'];
var items = ['mushroom','apple'];
var productList = [];
const selectors = {
  search : '#nav-search-submit-button',
  searchbox : '#twotabsearchtextbox',
  //product1 : '[class = "a-size-medium a-color-base a-text-normal" ]',
  product : '[class = "a-size-base-plus a-color-base a-text-normal"]',
  searchdropdown : 'select[aria-describedby="searchDropdownDescription"]'
};
(async () => {
  // wrapper to catch errors
  try {
    // create a new browser instance
    const browser = await puppeteer.launch({headless: false});

    // create a page inside the browser;
    const page = await browser.newPage();
    // navigate to a website
    await page.goto(domain, {
      timeout: 3000000
    });
    await page.select(selectors.searchdropdown,"search-alias=amazonfresh");
    for (let i = 0; i < items.length; i++) { 
      // search and wait the product list
      new Promise(r => setTimeout(r, 500));
      
      await page.type(selectors.searchbox, items[i]);
      await page.click(selectors.search);
      await page.waitForSelector(selectors.product);
      let product = await page.$$(selectors.product);
      await product[0].click();
      await page.waitForSelector('body')
      let url = page.url().split('/');
      for (let i = 0;i < url.length; i++){
        if (url[i] == 'dp'){
          let id = url[i+1].split('?');
          productList.push(id[0])
        }
      }
      await page.waitForSelector(selectors.searchbox);
      let input = await page.$(selectors.searchbox);
      await input.click({ clickCount: 3 });
    }
    
    const spawn = require('child_process').spawn;
    const pythonProcess = spawn('python3', ['cart.py', productList]);
    pythonProcess.stdout.on('data', (data) => {
      console.log(data.toString());
    }); 
    
  } catch (error) {
    // display errors
    console.log(error);
  }
})();