# Keep Eyes On Ticket

This lambda function is build for watching the booking date of CENACOLO VINCIANO, it will crawl the page by headless chrome and send notification email.

### Tools

* AWS Lambda
* AWS SES
* Headless Chrome
* Puppeteer

## Usage

* Prepare one headless chrome instance with [docker](https://hub.docker.com/r/alpeware/chrome-headless-trunk/).

    ```
    VOLUME /tmp/chromedata/:/data
    PORT 9222
    ```

* Visit the url with debugger port `http://[ip-address]:9222/json`.

    ```
    {
      "description": "",
      "devtoolsFrontendUrl": "/devtools/inspector.html?ws=[ip-address]:8111/devtools/page/xxx",
      "id": "xxx",
      "title": "about:blank",
      "type": "page",
      "url": "about:blank",
      "webSocketDebuggerUrl": "ws://[ip-address]:9222/devtools/page/xxx" // browser ws endpoint
    }
    ```

* Verify at least one domain and email address in AWS SES.
* Add new role with `SES` and `CloudWatch` full access in AWS IAM.
* Install dependencies.

    ```
    npm install
    ```
* Build package and upload to S3.

    ```
    npm run build
    ```
* Create lambda function with the following environment variables.

    ```
    BROWSER_WS_ENDPOINT=ws://[ip-address]:9222/devtools/page/xxx
    EMAIL_ADDRESS=me@me.com
    YOUR_NAME=me
    NODE_ENV=production
    ```
