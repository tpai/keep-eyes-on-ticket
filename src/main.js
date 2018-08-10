const sendMail = require('../lib/sendMail');

const main = {
  init: async (page) => {
    console.log('Go to website');
    await main.gotoWebsite(page);

    console.log('Crawl info');
    const it = await main.crawlInfo(page);

    console.log('Send mail');
    await main.sendMail(it);
  },
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
  sendMail: (data) => {
    return sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: [process.env.EMAIL_ADDRESS],
      cc: [],
      replyTo: [process.env.EMAIL_ADDRESS],
      template: 'daily_log',
      dataJson: JSON.stringify({
        name: process.env.YOUR_NAME,
        data,
      }),
    });
  },
};

module.exports = main;
