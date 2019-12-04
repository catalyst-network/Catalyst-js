import { describe, it } from 'mocha';
import assert from 'assert';
import nacl from 'tweetnacl';
import transaction from '../src/Transaction';

function toHexString(byteArray: Uint8Array) {
  if (!byteArray) {
    return '';
  }
  let hexStr = '';
  for (let i = 0; i < byteArray.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    let hex = (byteArray[i] & 0xff).toString(16);
    hex = (hex.length === 1) ? `0${hex}` : hex;
    hexStr += hex;
  }
  return hexStr.toUpperCase();
}

const txParams = {
  from: '0x0000000000000000000000000000000000000000',
  nonce: '0x00',
  gasPrice: '0x09184e72a000',
  gasLimit: '0x2710',
  to: '0x0000000000000000000000000000000000000000',
  value: '0x00',
  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
};

describe('Transaction builder', () => {
  it('can create a signed tx', async () => {
    const keypair = nacl.sign.keyPair();
    const wallet = {
      privateKey: keypair.secretKey,
      privateKeyHex: toHexString(keypair.secretKey),
      publicKey: keypair.publicKey,
    };
    const tx = await transaction(wallet, txParams);
    assert.deepEqual(tx.length, 201);
  });

  it('fails to sign with an invalid key', async () => {
    const keypair = nacl.sign.keyPair();
    const wallet = {
      privateKey: keypair.secretKey,
      privateKeyHex: toHexString(keypair.secretKey),
      publicKey: keypair.secretKey,
    };
    try {
      await transaction(wallet, txParams);
    } catch (e) {
      assert.deepEqual(e.message, 'Failed to sign');
    }
  });
});
