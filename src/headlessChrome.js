const fetch = require('isomorphic-fetch');

const checkAlive = require('../lib/checkAlive');

const {
  API_ACCESS_KEY,
  API_SECRET_KEY,
  HEADLESS_CHROME_ENDPOINT,
  RANCHER_API_URL,
} = process.env;

const fetchOptions = {
  method: 'POST',
  headers: {
    Authorization: `Basic ${Buffer.from(`${API_ACCESS_KEY}:${API_SECRET_KEY}`).toString('base64')}`
  },
};

const headlessChrome = {
  mount: async () => {
    console.log('Activate headless chrome');
    await headlessChrome.activateHeadlessChrome();

    console.log('Ping headless chrome');
    await checkAlive(HEADLESS_CHROME_ENDPOINT);

    console.log('Return browser endpoint');
    return HEADLESS_CHROME_ENDPOINT;
  },
  unmount: async () => {
    console.log('Deactivate headless chrome');
    await headlessChrome.deactivateHeadlessChrome();
  },
  activateHeadlessChrome: () => {
    return fetch(`${RANCHER_API_URL}?action=activate`, fetchOptions)
      .then(res => res.json().then(json => {
        if (json.type === 'error') {
          return Promise.reject(json.code);
        } else {
          return Promise.resolve(json);
        }
      }))
      .catch(err => {
        if (err) throw err;
      });
  },
  deactivateHeadlessChrome: () => {
    return fetch(`${RANCHER_API_URL}?action=deactivate`, fetchOptions)
      .then(res => res.json().then(json => {
        if (json.type === 'error') {
          return Promise.reject(json.code);
        } else {
          return Promise.resolve(json);
        }
      }))
      .catch(err => {
        if (err) throw err;
      });
  },
  fetchBrowserWSEndpoint: () => {
    return fetch(HEADLESS_CHROME_ENDPOINT)
      .then(res => res.json().then(json => {
        return json[0].webSocketDebuggerUrl;
      }))
      .catch(err => {
        if (err) throw err;
      });
  },
};

module.exports = headlessChrome;
