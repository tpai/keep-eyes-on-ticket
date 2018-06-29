const fetch = require('isomorphic-fetch');

const fetchOptions = {
  method: 'POST',
  headers: {
    Authorization: `Basic ${Buffer.from(`${process.env.API_ACCESS_KEY}:${process.env.API_SECRET_KEY}`).toString('base64')}`
  },
};

module.exports = {
  activateHeadlessChrome: () => {
    return fetch(`${process.env.RANCHER_API_URL}?action=activate`, fetchOptions)
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
    return fetch(`${process.env.RANCHER_API_URL}?action=deactivate`, fetchOptions)
      .then(res => res.json().then(json => {
        console.log(json);
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
    return fetch(process.env.REMOTE_CHROME_URL)
      .then(res => res.json().then(json => {
        return json[0].webSocketDebuggerUrl;
      }))
      .catch(err => {
        if (err) throw err;
      });
  },
};
