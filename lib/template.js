const fs = require('fs');
const path = require('path');
const aws = require('aws-sdk');
aws.config.update({ region: process.env.AWS_DEFAULT_REGION });

const action = process.argv[2];
const template = getTemplate(process.argv[3]);
const ses = new aws.SES();

try {
  switch(action) {
    case 'create':
      ses.createTemplate(template, (err, data) => {
        if (err) throw new Error(err);
        else console.log(data);
      });
      break;
    case 'update':
      ses.updateTemplate(template, (err, data) => {
        if (err) throw new Error(err);
        else console.log(data);
      });
      break;
    case 'delete':
      ses.deleteTemplate({
        TemplateName: process.argv[3],
      }, (err, data) => {
        if (err) throw new Error(err);
        else console.log(data);
      });
      break;
    default:
      throw new Error('Please provide action argument, such as create, update or delete.');
      break;
  }
} catch (err) {
  console.log(err);
}

function getTemplate (templatePath) {
  const filepath = path.resolve(__dirname, '..', templatePath);
  if (fs.existsSync(filepath)) {
    const json = require(filepath);
    return json;
  }
}
