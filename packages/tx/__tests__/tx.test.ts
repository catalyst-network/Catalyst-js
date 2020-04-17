
import { base32StringFromBytes, hexStringFromBytes } from '@catalyst-net-js/common';
import Transaction from '../src';

const txData: any = {
  nonce: '0x0',
  gasPrice: '0x09184e72a000',
  gasLimit: '0x2710',
  to: '0x0000000000000000000000000000000000000000',
  value: '0x0',
  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
};
const tx = new Transaction(txData);
const base32Key = 'UUDZCB5QPOQP7YS6P224QP3PR77USPENK37VQX3HIKENZI6DC7GMINPQLEDNQ42YDAF3IHCXOVFHWC7KZY6MQ4TW4Y7JQJDWQWR7VCA';


describe('tx', () => {
  it('creates a tx', () => {
    const amount = tx.entry.getAmount();
    const gasPrice = tx.entry.getGasPrice();
    const gasLimit = tx.entry.getGasLimit();
    const receiver = tx.entry.getReceiverAddress();
    const nonce = tx.entry.getNonce();

    expect(gasLimit).toBe(10000);
    expect(nonce).toBe(0);
    expect(amount.toString()).toBe('0,0,0,0,0,0,0,0');
    expect(gasPrice.toString()).toBe('0,160,114,78,24,9,0,0');
    expect(JSON.stringify(receiver)).toBe(JSON.stringify(new Uint8Array(
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    )));
  });

  it('throws an error if the tx contains an invalid input', () => {
    const invalidTxData: any = {
      nonce: '0x00',
      gasPrice: '0x09184e72a000',
      gasLimit: '0x2710',
      to: '0x0000000000000000000000000000000000000000',
      value: '0x00',
      data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
    };

    const invalidString = 'invalid';

    Object.keys(invalidTxData).forEach((key) => {
      invalidTxData[key] = invalidString;
      expect(() => new Transaction(invalidTxData)).toThrowError(`${key} is invalid`);
      invalidTxData[key] = txData[key];
    });
  });

  it('signs a tx', async (done) => {
    await tx.sign(base32Key);
    const sender = tx.entry.getSenderAddress_asB64();
    const signature = tx.entry.getSignature();
    const signatureContext = signature.getSigningContext();

    expect(sender).toBe('xDXwWQbYc1gYC7QcV3VKewvqzjzIcnbmPpgkdoWj+og=');
    expect(signatureContext.getNetworkType()).toBe(3);
    expect(signatureContext.getSignatureType()).toBe(1);
    expect(signature.getRawBytes_asB64()).toBe(
      'oa1qedmaMvdoMtk8udBKVa/oTmt6tHBKvW3pFEOIPsJYWJ13D5JqJNLQwVDMhuyPhAr6C1W3aenG63rjJ28RAA==',
    );
    done();
  });

  it('serializes a tx', () => {
    const serializedTx = tx.serialize();
    expect(base32StringFromBytes(serializedTx)).toBe(
      'BK7QCCQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACIQMINPQLEDNQ42YDAF3IHCXOVFHWC7KZY6MQ4TW4Y7JQJDWQWR7VCA2BAAAAAAAAAAAAABCER7XIZLTOQZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAABLSUCAAUBZE4GAJAAADBECOIJEAUBAIAMIACESAUGWWU6OZTIZPO2BS3E6LTUCKKWX6QTTLPK2HASV5NXURIQ4IH3BFQWE5O4HZE2RE2LIMCUGMQ3WI7BAK7IFVLN3J5HDOW6XDE5XRCAA',
    );
  });

  it('deserializes a tx', () => {
    const serialized = tx.serialize();
    const serializeTx = new Transaction(serialized);
    const deserialized = serializeTx.deserialize();

    const amount = deserialized.getAmount();
    const gasPrice = deserialized.getGasPrice();
    const gasLimit = deserialized.getGasLimit();
    const receiver = deserialized.getReceiverAddress();
    const nonce = deserialized.getNonce();

    expect(gasLimit).toBe(10000);
    expect(nonce).toBe(0);
    expect(amount.toString()).toBe('0,0,0,0,0,0,0,0');
    expect(gasPrice.toString()).toBe('0,160,114,78,24,9,0,0');
    expect(JSON.stringify(receiver)).toBe(JSON.stringify(new Uint8Array(
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    )));
  });

  it('deserializes a hex tx', () => {
    const serialized = tx.serialize();
    const serializedTx = new Transaction(hexStringFromBytes(serialized));
    const deserialized = serializedTx.deserialize();
    const amount = deserialized.getAmount();
    const gasPrice = deserialized.getGasPrice();
    const gasLimit = deserialized.getGasLimit();
    const receiver = deserialized.getReceiverAddress();
    const nonce = deserialized.getNonce();
    expect(gasLimit).toBe(10000);
    expect(nonce).toBe(0);
    expect(JSON.stringify(amount)).toBe(JSON.stringify(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])));
    expect(JSON.stringify(gasPrice)).toBe(JSON.stringify(new Uint8Array([0, 160, 114, 78, 24, 9, 0, 0])));
    expect(JSON.stringify(receiver)).toBe(JSON.stringify(new Uint8Array(
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    )));
  });

  it('throws an error when trying to deserialize an unserialized tx', () => {
    expect(() => tx.deserialize()).toThrow();
  });
});
