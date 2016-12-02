const fetch = require('node-fetch');

const url = require('./config/api');

module.exports = function(upload) {
  return fetch(`${url}token`)
    .then(response => response.json())
    .then(result => {
      const {token} = result;
      return fetch(`${url}wall`, {
        method: 'POST',
        body: JSON.stringify({
          token,
          upload
        }),
        headers: {
          'content-type': 'application/json'
        }
      });
    });
};
