# Keep Eyes On Ticket

This lambda function is build for watching the booking date of CENACOLO VINCIANO, it will crawl the page by headless chrome and send notification email.

**Tools**

* AWS Lambda
* AWS SES
* Headless Chrome
* Puppeteer

## Usage

1. Verify at least new domain and email address in AWS SES.

* Add new role with `SES` and `CloudWatch` full access.

* Setup environment variables.

    ```
    cp .env.example .env
    ```

* Test on local.

    ```
    npm start
    ```

* Wrap all to zip file and upload to S3.

* Create lambda function and test it.
