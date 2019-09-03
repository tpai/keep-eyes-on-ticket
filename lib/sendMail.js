const aws = require('aws-sdk');

aws.config.update({ region: process.env.AWS_DEFAULT_REGION });

module.exports = function ({
  from,
  to,
  cc,
  bcc,
  replyTo,
  template,
  dataJson,
}) {
  return new aws.SES().sendTemplatedEmail({
    Destination: {
      ToAddresses: to,
      CcAddresses: cc,
      BccAddresses: bcc,
    },
    Source: from,
    Template: template,
    TemplateData: dataJson,
    ReplyToAddresses: replyTo,
  }).promise()
    .then(data => console.log(data))
    .catch(err => console.log(err, err.stack));
};
