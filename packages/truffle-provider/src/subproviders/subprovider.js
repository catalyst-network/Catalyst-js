/* eslint-disable no-unused-vars */
const createPayload = require('./utils/create-payload.js');


// this is the base class for a subprovider -- mostly helpers


function SubProvider() {

}

SubProvider.prototype.setEngine = function setEngine(engine) {
  const self = this;
  self.engine = engine;
  engine.on('block', (block) => {
    self.currentBlock = block;
  });
};

SubProvider.prototype.handleRequest = function handleRequest(payload, next, end) {
  throw new Error('Subproviders should override `handleRequest`.');
};

SubProvider.prototype.emitPayload = function emitPayload(payload, cb) {
  const self = this;
  self.engine.sendAsync(createPayload(payload), cb);
};

module.exports = SubProvider;
