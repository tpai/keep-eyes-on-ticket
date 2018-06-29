# Keep Eyes On Ticket

This lambda function is build for watching the booking date of CENACOLO VINCIANO, it will crawl the page with headless chrome and send notification email.

### Tools

* AWS Lambda
* AWS SES
* Headless Chrome
* Puppeteer

## Usage

1. Prepare one headless chrome instance with [docker](https://hub.docker.com/r/alpeware/chrome-headless-trunk/).

    ```
    VOLUME /tmp/chromedata/:/data
    PORT 9222
    ```
1. Verify at least one domain and email address in AWS SES.
1. Add new role with `SES` and `CloudWatch` full access in AWS IAM.

    ```
    REMOTE_CHROME_URL=http://[ip-address]:9222/json # headless chrome debugger url
    EMAIL_ADDRESS= # receiver email address
    YOUR_NAME= # receiver name

    # rancher api info (remove it if you don't use rancher)
    RANCHER_API_URL=
    API_ACCESS_KEY=
    API_SECRET_KEY=

    ```
1. Install dependencies(with chromium) and test on local.

    ```
    npm install
    npm start
    ```
1. Build package and upload to S3.

    ```
    npm run build
    ```
1. Create lambda function and test it.

## Q&A

**Why activate headless chrome manually?**

I launch chrome at remote rancher server and got hacked, because the endpoint is public all the time, so I rewrite the script that only activate chrome service when lambda need it by API call.
