const sendMail = require('../lib/sendMail');

module.exports = {
  gotoWebsite: (page) => {
    return page.goto('https://cenacolovinciano.vivaticket.it/');
  },
  crawlInfo: (page) => {
    return page.evaluate(selector => {
      const element = document.querySelector(selector);
      if (!element) return null;
      return document.querySelector(selector).textContent.match(/\d{2}\/\d{2}\/\d{4}/g);
    }, '#showMainInfo > div:nth-child(2) > div:first-of-type > i');
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
        date: `from ${data[0]} to ${data[1]}`,
      }),
    });
  },
};
