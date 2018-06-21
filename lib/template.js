const aws = require('aws-sdk');
const template = require('../templateJSON');

aws.config.update({ region: process.env.AWS_DEFAULT_REGION });

switch(process.argv[2]) {
  case 'create':
    new aws.SES().createTemplate(template, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
    break;
  case 'update':
    new aws.SES().updateTemplate(template, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
    break;
  default:
    throw new Error('Please provide argument.');
    break;
}