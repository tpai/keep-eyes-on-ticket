const fetch = require('isomorphic-fetch');
const FormData = require('form-data');
const { JSDOM } = require('jsdom');

const sendMail = require('../lib/sendMail');

const main = {
  init: async (page) => {
    console.log('Running task `The Last Supper`');
    await theLastSupper.gotoWebsite(page);
    const it = await theLastSupper.crawlInfo(page);

    console.log('Send mail');
    await theLastSupper.sendMail({
      theLastSupperText: it,
    });
  },
};

const theLastSupper = {
  gotoWebsite: (page) => {
    return page.goto('https://cenacolovinciano.vivaticket.it/');
  },
  crawlInfo: (page) => {
    return page.evaluate(selector => {
      const element = document.querySelector(selector);
      if (!element) return null;
      return document.querySelector(selector).textContent;
    }, '#event_shout');
  },
  sendMail: ({
    theLastSupperText,
  }) => {
    return sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: [process.env.EMAIL_ADDRESS],
      cc: [],
      replyTo: [process.env.EMAIL_ADDRESS],
      template: 'daily_log',
      dataJson: JSON.stringify({
        name: process.env.YOUR_NAME,
        data: theLastSupperText,
      }),
    });
  },
};

module.exports = main;
