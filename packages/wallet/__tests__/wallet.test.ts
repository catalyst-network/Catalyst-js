import nacl from 'tweetnacl';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import Wallet from '../src';

describe('wallet', () => {
  it('generate a wallet', () => {
    const wallet = Wallet.generate();

    expect(wallet.getPublicKey().length).toBe(32);
    expect(wallet.getPrivateKey().length).toBe(64);
  });

  it('generate a wallet from a private key', () => {
    const privateKey = new Uint8Array([
      106, 79, 164, 29, 195, 12, 14, 180, 141, 78, 133,
      39, 120, 185, 109, 102, 205, 162, 110, 20, 106, 31,
      140, 114, 244, 106, 185, 105, 145, 237, 174, 47, 107,
      0, 68, 77, 197, 93, 222, 180, 241, 251, 232, 194,
      113, 223, 99, 98, 35, 167, 190, 183, 140, 159, 26,
      117, 75, 42, 138, 90, 8, 216, 107, 39,
    ]);

    const wallet = Wallet.generateFromPrivateKey(privateKey);

    expect(JSON.stringify(wallet.getPrivateKey())).toBe(JSON.stringify(privateKey));
    expect(wallet.getPrivateKeyString()).toBe('NJH2IHODBQHLJDKOQUTXROLNM3G2E3QUNIPYY4XUNK4WTEPNVYXWWACEJXCV3XVU6H56RQTR35RWEI5HX23YZHY2OVFSVCS2BDMGWJY');
    expect(wallet.getPublicKeyString()).toBe('NMAEITOFLXPLJ4P35DBHDX3DMIR2PPVXRSPRU5KLFKFFUCGYNMTQ');
    expect(wallet.getAddressString()).toBe('0x6b00444dc55ddeb4f1fbe8c271df636223a7beb78c9f1a754b2a8a5a08d86b27');
  });

  it('generate a wallet from a seed', () => {
    const seedPhrase = 'fee talk ride output ignore turkey social label owner twist disagree shallow';
    const seed = bip39.mnemonicToSeedSync(seedPhrase).toString('hex');
    const data = derivePath("m/44'/42069'/1'", seed);
    const wallet = Wallet.generateFromSeed(new Uint8Array(data.key));
    expect(wallet.getPrivateKeyString()).toBe('CVXWTP2YZJKUP7HROU6YCBPSR7HJGBBZVYE5PXDNY2GAVFWKFDQUFALZ7FU5RCKCPOEZASHV7VWPEQ3IWYDIMW5NJMCGPBMSDUWCGPA');
    expect(wallet.getPublicKeyString()).toBe('IKAXT6LJ3CEUE64JSBEPL7LM6JBWRNQGQZN22SYEM6CZEHJMEM6A');
    expect(wallet.getAddressString()).toBe('0x428179f969d889427b899048f5fd6cf24368b606865bad4b046785921d2c233c');
  });
});
