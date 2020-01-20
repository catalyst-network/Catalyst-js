import Wallet from '../src';

describe('wallet', () => {
  it('generate a wallet', () => {
    const wallet = Wallet.generate();
    console.log(wallet);
  });

  it('generate a wallet from a private key', () => {
    const wallet = Wallet.generateFromPrivateKey();
    console.log(wallet);
  });

  it('generate a wallet from a seed', () => {
    const wallet = Wallet.generateFromSeed();
    console.log(wallet);
  });
});
