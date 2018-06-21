require('dotenv').config();

const puppeteer = require('puppeteer');
const sendMail = require('./lib/sendMail');

const handler = (event, context, callback) => {
  (async () => {
    let browser;
    if (process.env.NODE_ENV === 'development') {
      browser = await puppeteer.launch();
    } else {
      browser = await puppeteer.connect({
        browserWSEndpoint: process.env.BROWSER_WS_ENDPOINT,
      });
    }
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    await page.goto('https://cenacolovinciano.vivaticket.it/');
    const dates = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      if (!element) return null;
      return document.querySelector(selector).textContent.match(/\d{2}\/\d{2}\/\d{4}/g);
    }, '#showMainInfo > div:nth-child(2) > div:first-of-type > i');

    const response = await sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: [process.env.EMAIL_ADDRESS],
      cc: [],
      replyTo: [process.env.EMAIL_ADDRESS],
      template: 'daily_log',
      dataJson: JSON.stringify({
        name: process.env.YOUR_NAME,
        date: `from ${dates[0]} to ${dates[1]}`,
      }),
    });

    if (process.env.NODE_ENV === 'development') {
      await browser.close();
    } else {
      await page.close();
    }

    callback(response);
  })();
};

if (process.env.NODE_ENV === 'development') {
  handler();
}

exports.handler = handler;
