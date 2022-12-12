//const express = require('express');
import express from "express";
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import {PythonShell} from 'python-shell';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(3000, () => {
  console.log('start server');
})

var HtmlPath = path.resolve(__dirname, '..');
app.use(express.static(HtmlPath));
app.get('/', (req, res) => {
  res.redirect('/index.html');
  //res.sendFile("index.html");
})

app.post('/getUrl', (req, res) => {
  const { items } = req.body;
  const domain = "https://www.amazon.com";
  var productList = [];
  const selectors = {
    search : '#nav-search-submit-button',
    searchbox : '#twotabsearchtextbox',
    product : '[class = "a-size-base-plus a-color-base a-text-normal"]',
    searchdropdown : 'select[aria-describedby="searchDropdownDescription"]'
  };
  (async function () {
    try {
      const browser = await puppeteer.launch({headless: false});
      const page = await browser.newPage();
      await page.goto(domain, {
        timeout: 10000,
        waitUntil: 'load'
      });
      
      try {
        await page.waitForSelector(selectors.searchdropdown, {timeout: 3000});
      } catch (e) {
        await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
      }
      await page.select(selectors.searchdropdown,"search-alias=amazonfresh");
      for (let i = 0; i < items.length; i++) { 
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
            //let id = url[i+1].split('?');
            productList.push(url[i+1])
          }
        }
        await page.waitForSelector(selectors.searchbox);
        let input = await page.$(selectors.searchbox);
        await input.click({ clickCount: 3 });
      }
      /*
      const spawn = require('child_process').spawn;
      const py = spawn('python3', ['./cartApi.py', JSON.stringify(productList)]);
      py.stdout.on('data', (data) => {
        console.log(data.toString());
      }); */
      if (productList.length!=0){
        let options = {
          mode: 'text',
          pythonOptions: ['-u'], 
          args: [JSON.stringify(productList)]
        };
        PythonShell.run('js/cartApi.py', options, function (err, result) {
          if (err) {
            res.sendStatus(500);
          }
          console.log(result.toString());
          res.send(result.toString());
        
        });
      } else {
        res.sendStatus(500);
      }
      await browser.close();
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
      await browser.close();
    }
  })();
})

