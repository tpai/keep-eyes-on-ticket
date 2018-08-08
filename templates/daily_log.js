module.exports = {
  Template: {
    TemplateName: 'daily_log',
    SubjectPart: 'Daily Notification',

    TextPart: `Hello {{name}},

The booking date of CENACOLO VINCIANO is {{date}}.`,

    HtmlPart: `<p>Hello {{name}},</p>

<p>The booking date of CENACOLO VINCIANO is {{date}}.</p>`
  }
};
