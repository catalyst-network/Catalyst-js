
import { base32StringFromBytes } from '@catalyst-net-js/common';
import Transaction from '../src';

const txData: any = {
  nonce: '0x00',
  gasPrice: '0x09184e72a000',
  gasLimit: '0x2710',
  to: '0x0000000000000000000000000000000000000000',
  value: '0x00',
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
    expect(JSON.stringify(amount)).toBe(JSON.stringify(new Uint8Array([0])));
    expect(JSON.stringify(gasPrice)).toBe(JSON.stringify(new Uint8Array([9, 24, 78, 114, 160, 0])));
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
      'dmaaRrVYj8HfpG3/UJWiEkMTj23yJZS12TWLcisYj5mybTP/FQOIVcxhg5zHAILi+bGpCBlwwvLXZvnSUBMVBQ==',
    );
    done();
  });

  it('serializes a tx', () => {
    const serializedTx = tx.serialize();
    expect(base32StringFromBytes(serializedTx)).toBe(
      'BK3ACCQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACIQMINPQLEDNQ42YDAF3IHCXOVFHWC7KZY6MQ4TW4Y7JQJDWQWR7VCA2AEACEJD7ORSXG5BSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAACXGIDASGCOOKQAAOEQJZJEQCQEBABRAAISIB3GNGSGWVMI7QO7URW76UEVUIJEGE4PNXZCLFFV3E2YW4RLDCHZTMTNGP7RKA4IKXGGDA44Y4AIFYXZWGUQQGLQYLZNOZXZ2JIBGFIF',
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
    expect(JSON.stringify(amount)).toBe(JSON.stringify(new Uint8Array([0])));
    expect(JSON.stringify(gasPrice)).toBe(JSON.stringify(new Uint8Array([9, 24, 78, 114, 160, 0])));
    expect(JSON.stringify(receiver)).toBe(JSON.stringify(new Uint8Array(
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    )));
  });

  it('deserializes a hex tx', () => {
    const serializedTx = new Transaction('0aa2070a01001220d6fc371d1b6d97cc47a1125c13aa0ed6ae5c8e818e14dbff0dbf1de28580753f1a0100229706608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506102b7806100606000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80630900f01014610051578063445df0ac146100955780638da5cb5b146100b3578063fdacd576146100fd575b600080fd5b6100936004803603602081101561006757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061012b565b005b61009d6101f7565b6040518082815260200191505060405180910390f35b6100bb6101fd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101296004803603602081101561011357600080fd5b8101908080359060200190929190505050610222565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156101f45760008190508073ffffffffffffffffffffffffffffffffffffffff1663fdacd5766001546040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b1580156101da57600080fd5b505af11580156101ee573d6000803e3d6000fd5b50505050505b50565b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561027f57806001819055505b5056fea265627a7a72315820b32effa2a1b47d95006f6b6221a722dc4427dfb227537d8f6ad7bf016db9082664736f6c634300050c003232054a817c800038b7a39a034208000000000000000052480a040803100112402831e8031bd7d2c29574836d4e84e8b05d7a849feb36a908d77ebedf9b51c1aab58eaebec26020fe287af0ba2a2d149eb960b168bbee5c6b273ba01681890c06');
    const deserialized = serializedTx.deserialize();
    const amount = deserialized.getAmount();
    const gasPrice = deserialized.getGasPrice();
    const gasLimit = deserialized.getGasLimit();
    const receiver = deserialized.getReceiverAddress();
    const nonce = deserialized.getNonce();
    expect(gasLimit).toBe(6721975);
    expect(nonce).toBe(0);
    expect(JSON.stringify(amount)).toBe(JSON.stringify(new Uint8Array([0])));
    expect(JSON.stringify(gasPrice)).toBe(JSON.stringify(new Uint8Array([74, 129, 124, 128, 0])));
    expect(JSON.stringify(receiver)).toBe(JSON.stringify(new Uint8Array(
      [0],
    )));
  });

  it('throws an error when trying to deserialize an unserialized tx', () => {
    expect(() => tx.deserialize()).toThrow();
  });
});
