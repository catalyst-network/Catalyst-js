/* eslint-disable no-use-before-define */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
const { inherits } = require('util');
const ethUtil = require('ethereumjs-util');
const { Transaction } = require('@catalyst-net-js/tx');
const Subprovider = require('./subprovider.js');
const { blockTagForPayload } = require('./utils/rpc-cache-utils');


// handles the following RPC methods:
//   eth_getTransactionCount (pending only)
// observes the following RPC methods:
//   eth_sendRawTransaction

module.exports = NonceTrackerSubprovider;

inherits(NonceTrackerSubprovider, Subprovider);

function NonceTrackerSubprovider(opts) {
  const self = this;

  self.nonceCache = {};
}


NonceTrackerSubprovider.prototype.handleRequest = function handleRequest(payload, next, end) {
  const self = this;

  switch (payload.method) {
    case 'eth_getTransactionCount':
      const blockTag = blockTagForPayload(payload);
      const address = payload.params[0].toLowerCase();
      const cachedResult = self.nonceCache[address];
      // only handle requests against the 'pending' blockTag
      if (blockTag === 'pending') {
        // has a result
        if (cachedResult) {
          end(null, cachedResult);
        // fallthrough then populate cache
        } else {
          next((err, result, cb) => {
            if (err) return cb();
            if (self.nonceCache[address] === undefined) {
              self.nonceCache[address] = result;
            }
            return cb();
          });
        }
      } else {
        next();
      }
      return;

    case 'eth_sendRawTransaction':
      // allow the request to continue normally
      next((err, result, cb) => {
        // only update local nonce if tx was submitted correctly
        if (err) return cb();
        // parse raw tx
        const tx = new Transaction(payload.params[0]);
        const entry = tx.deserialize();
        let nonce = entry.getNonce();
        const sender = entry.getSenderAddress();

        // var tx = new Transaction(new Buffer(ethUtil.stripHexPrefix(rawTx), 'hex'))
        // extract address
        const addressBuffer = ethUtil.keccak(Buffer.from(sender)).slice(-20);
        const ethAddress = ethUtil.bufferToHex(addressBuffer);
        // extract nonce and increment
        // var nonce = ethUtil.bufferToInt(tx.nonce)
        nonce += 1;
        // hexify and normalize
        let hexNonce = nonce.toString(16);
        if (hexNonce.length % 2) hexNonce = `0${hexNonce}`;
        hexNonce = `0x${hexNonce}`;
        // dont update our record on the nonce until the submit was successful
        // update cache
        self.nonceCache[ethAddress] = hexNonce;
        return cb();
      });
      return;

    default:
      next();
  }
};
