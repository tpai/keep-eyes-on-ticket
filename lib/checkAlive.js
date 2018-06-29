const isReachable = require('is-reachable');

module.exports = async (url) =>
  isReachable(url).then(reachable => {
    if (reachable) {
      console.log(`${url} is now alive!`);
    } else {
      console.log(`${url} is now dead.`);
      return checkAlive(url);
    }
  });
