if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const puppeteer = require('puppeteer');
const {
  mount: mountHeadlessChrome,
  unmount: unmountHeadlessChrome,
} = require('./src/headlessChrome');
const { init: mainInit } = require('./src/main');

const handler = async (event) => {
  let browser;
  if (process.env.NODE_ENV === 'development') {
    console.log('Launch chrome');
    browser = await puppeteer.launch();
  } else {
    const browserWSEndpoint = await mountHeadlessChrome();
    console.log(browserWSEndpoint);

    console.log('Connect chrome');
    browser = await puppeteer.connect({
      browserWSEndpoint,
    });
  }
  try {
    console.log('Create new page');
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // entry point of main function
    await mainInit(page);

    console.log('Close browser');
    await browser.close();
  } catch (err) {
    console.log('Error Occurred: ', err);
  } finally {
    if (process.env.NODE_ENV !== 'development') {
      await unmountHeadlessChrome();
    }
  }
  return;
};

if (process.env.NODE_ENV === 'development') {
  handler({ test: 'value' });
}

exports.handler = handler;
