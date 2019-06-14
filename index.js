if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const puppeteer = require('puppeteer');
const {
  mount: mountHeadlessChrome,
  unmount: unmountHeadlessChrome,
} = require('./src/headlessChrome');
const { init: mainInit } = require('./src/main');

const {
  NODE_ENV,
  HEADLESS_CHROME_ENDPOINT,
} = process.env;

const handler = async (event) => {
  let browser;
  try {
    if (NODE_ENV === 'development') {
      console.log('Launch chrome');
      browser = await puppeteer.launch();
    } else {
      const endpoint = await mountHeadlessChrome();
      console.log(endpoint);

      console.log('Connect chrome');
      browser = await puppeteer.connect({
        browserURL: endpoint,
      });
    }
    console.log('Create new page');
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // entry point of main function
    await mainInit(page);

    console.log('Close browser');
    await browser.close();
  } catch (err) {
    console.error(err);
  } finally {
    if (NODE_ENV !== 'development') {
      await unmountHeadlessChrome();
    }
  }
};

if (NODE_ENV === 'development') {
  handler({ test: 'value' });
}

exports.handler = handler;
