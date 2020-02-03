const extend = require('xtend');
const getRandomId = require('./random-id.js');


function createPayload(data) {
  return extend({
    // defaults
    id: getRandomId(),
    jsonrpc: '2.0',
    params: [],
    // user-specified
  }, data);
}

module.exports = createPayload;
