const fetch = require('isomorphic-fetch');

const sendMail = require('../lib/sendMail');
const translate = require('../lib/translate');

const {
  TARGET_URL,
  TARGET_SELECTOR,
  FROM,
  TO,
  CC,
  BCC,
  EMAIL_TEMPLATE,
  EMAIL_SUBJECT,
  GOOGLE_TRANSLATE_ENABLE,
} = process.env;

const main = {
  init: async (page) => {
    console.log('Running task');
    await app.gotoWebsite(page);
    const { text, html } = await app.getContent(page);

    if (GOOGLE_TRANSLATE_ENABLE) console.log('Translate text');
    const translatedText = GOOGLE_TRANSLATE_ENABLE ? await translate(text) : text;
    const translatedHTML = GOOGLE_TRANSLATE_ENABLE ? await translate(html) : html;

    console.log('Send mail');
    await app.sendMail({
      text: translatedText,
      html: translatedHTML
    });
  },
};

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
      from: FROM,
      to: TO ? TO.split(',') : [],
      cc: CC ? CC.split(',') : [],
      bcc: BCC ? BCC.split(',') : [],
      replyTo: [FROM],
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
