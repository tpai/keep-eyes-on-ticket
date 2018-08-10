if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const puppeteer = require('puppeteer');
const checkAlive = require('./lib/checkAlive');
const {
  activateHeadlessChrome,
  deactivateHeadlessChrome,
  fetchBrowserWSEndpoint,
} = require('./src/headlessChrome');
const { init: mainInit } = require('./src/main');

const handler = async (event) => {
  let browser;
  if (process.env.NODE_ENV === 'development') {
    console.log('Launch chrome');
    browser = await puppeteer.launch();
  } else {
    console.log('Activate headless chrome');
    await activateHeadlessChrome();

    console.log('Ping headless chrome');
    await checkAlive(process.env.REMOTE_CHROME_URL);

    console.log('Fetch browser websocket endpoint');
    const browserWSEndpoint = await fetchBrowserWSEndpoint();
    console.log(browserWSEndpoint);

    console.log('Connect chrome');
    browser = await puppeteer.connect({
      browserWSEndpoint,
    });
  }
  console.log('Create new page');
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // entry point of main function
  await mainInit(page);

  console.log('Close browser');
  await browser.close();

  if (process.env.NODE_ENV !== 'development') {
    console.log('Deactivate headless chrome');
    await deactivateHeadlessChrome();
  }
  return;
};

if (process.env.NODE_ENV === 'development') {
  handler({ test: 'value' });
}

exports.handler = handler;
