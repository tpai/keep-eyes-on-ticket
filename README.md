# Keep Eyes On Ticket

This lambda function is build for watching the booking date of CENACOLO VINCIANO, it will crawl the specific section of the page and send with email.

### Tools

* AWS Lambda
* AWS SES
* Headless Chrome
* Puppeteer
* Rancher

## Usage

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
    npm run (create|update) path/to/template/file
    ```
1. Build package.

    ```
    npm run build
    ```
1. Create archived package, upload to AWS lambda and setup environment variables.

    ```sh
    # Headless Chrome Debugger URL
    REMOTE_CHROME_URL=http://[ip-address]:9222/json
    # Receiver Email Address
    EMAIL_ADDRESS=
    # Receiver Name
    YOUR_NAME=

    RANCHER_API_URL=
    API_ACCESS_KEY=
    API_SECRET_KEY=
    ```

## Q&A

**Why not activate headless chrome in the beginning?**

I did and got hacked, because the endpoint is public all the time, someone might use it with bad intention.

**Can I use other container management platform but Rancher?**

Yes you can.
