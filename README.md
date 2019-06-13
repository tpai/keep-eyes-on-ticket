# Keep Eyes On Ticket

At first, this AWS Lambda function is build for watching the booking date of CENACOLO VINCIANO, but now I've already revised to a crawler which you could provide specific URL and selector string, it will get the content and send email via AWS SES after you trigger the function.

### Tools

* AWS Lambda
* AWS SES
* Headless Chrome
* Puppeteer
* Rancher

## Prerequisites

1. Prepare one [headless chrome docker instance](https://hub.docker.com/r/alpeware/chrome-headless-trunk/).

    ```
    FROM alpeware/chrome-headless-trunk

    VOLUME /tmp/chromedata:/data
    PORT 9222
    ```
1. Verify at least one domain and email address in AWS SES.
1. Add new role with `SES` and `CloudWatch` full access in AWS IAM.
1. Install dependencies(with chromium).

    ```
    npm install
    ```
1. Create / Update email template.

    ```
    npm run (create|update) templates/simple-text.js
    ```

## Usage

### Development

1. Setup environment variables and fill it up.

    ```
    cp .env.example .env
    ```

1. In development mode, app will use local headless chrome instance instead.

    ```
    npm run start
    ```

### Production

1. Build archived package.

    ```
    npm run build
    ```
1. Upload to AWS lambda.
1. Setup environment variables.
1. Click `Test` button.

## Q&A

**Why not activate headless chrome in the beginning?**

I did and got hacked, because the endpoint is public all the time, someone might use it with bad intention.

**Can I use other container management platform but Rancher?**

Yes you can, help yourself.
