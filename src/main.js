const fetch = require('isomorphic-fetch');

const sendMail = require('../lib/sendMail');

const main = {
  init: async (page) => {
    console.log('Running task');
    await app.gotoWebsite(page);
    const { text, html } = await app.getContent(page);

    console.log('Send mail');
    await app.sendMail({ text, html });
  },
};

const {
  TARGET_URL,
  TARGET_SELECTOR,
  EMAIL_ADDRESS,
  EMAIL_TEMPLATE,
  EMAIL_SUBJECT,
} = process.env;

const app = {
  gotoWebsite: (page) => {
    return page.goto(TARGET_URL);
  },
  getContent: (page) => {
    return page.evaluate(selector => {
      const element = document.querySelector(selector);
      if (!element) return null;
      return {
        text: element.textContent,
        html: element.outerHTML,
      };
    }, TARGET_SELECTOR);
  },
  sendMail: ({ text, html }) => {
    return sendMail({
      from: EMAIL_ADDRESS,
      to: [EMAIL_ADDRESS],
      cc: [],
      replyTo: [EMAIL_ADDRESS],
      template: 'simple-text',
      dataJson: JSON.stringify({
        subject: EMAIL_SUBJECT,
        text,
        html,
      }),
    });
  },
};

module.exports = main;
