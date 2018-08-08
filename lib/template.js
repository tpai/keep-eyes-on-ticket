const fs = require('fs');
const path = require('path');
const aws = require('aws-sdk');

const action = process.argv[2];
const filepath = path.resolve(__dirname, '..', process.argv[3]);

if (fs.existsSync(filepath)) {
  const template = require(filepath);

  aws.config.update({ region: process.env.AWS_DEFAULT_REGION });

  switch(action) {
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
} else {
  console.log(`File does not exists. (${filepath})`);
}
