
import Transaction from '../src';

describe('tx', () => {
  it('needs tests', () => {
    const txData = {
      nonce: '0x00',
      gasPrice: '0x09184e72a000',
      gasLimit: '0x2710',
      to: '0x0000000000000000000000000000000000000000',
      value: '0x00',
      data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
    };
    const tx = new Transaction(txData);
    console.log(tx.entry.getAmount());
  });
});
