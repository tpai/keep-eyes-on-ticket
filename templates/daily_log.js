module.exports = {
  Template: {
    TemplateName: 'daily_log',
    SubjectPart: 'Daily Notification',

    TextPart: `Hello {{name}},

{{data}}.`,

    HtmlPart: `<p>Hello {{name}},</p>

<pre>{{data}}</pre>`
  }
};
