# Keep Eyes On Ticket

This lambda function is build for watching the booking date of CENACOLO VINCIANO, it will crawl the page by headless chrome and send notification email.

### Tools

* AWS Lambda
* AWS SES
* Headless Chrome
* Puppeteer

## Usage

1. Verify at least new domain and email address in AWS SES.
2. Add new role with `SES` and `CloudWatch` full access.
3. Setup environment variables.

    ```
    cp .env.example .env
    ```
4. Test on local.

    ```
    npm start
    ```
5. Wrap all to zip file and upload to S3.
6. Create lambda function and test it.
