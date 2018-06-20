const aws = require('aws-sdk');

aws.config.update({ region: process.env.AWS_DEFAULT_REGION });

module.exports = function ({
  from,
  to,
  cc,
  replyTo,
  template,
  dataJson,
}) {
  return new aws.SES().sendTemplatedEmail({
    Destination: {
      CcAddresses: cc,
      ToAddresses: to,
    },
    Source: from,
    Template: template,
    TemplateData: dataJson,
    ReplyToAddresses: replyTo,
  }).promise()
    .then(data => console.log(data))
    .catch(err => console.log(err, err.stack));
};
