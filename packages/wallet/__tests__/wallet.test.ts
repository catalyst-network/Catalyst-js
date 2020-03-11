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

  it('generate a wallet from a private key', async () => {
    const privateKey = new Uint8Array([
      106, 79, 164, 29, 195, 12, 14, 180, 141, 78, 133,
      39, 120, 185, 109, 102, 205, 162, 110, 20, 106, 31,
      140, 114, 244, 106, 185, 105, 145, 237, 174, 47, 107,
      0, 68, 77, 197, 93, 222, 180, 241, 251, 232, 194,
      113, 223, 99, 98, 35, 167, 190, 183, 140, 159, 26,
      117, 75, 42, 138, 90, 8, 216, 107, 39,
    ]);

    const wallet = await Wallet.generateFromPrivateKey(privateKey);

    expect(JSON.stringify(wallet.getPrivateKey())).toBe(JSON.stringify(privateKey));
    expect(wallet.getPrivateKeyString()).toBe('NJH2IHODBQHLJDKOQUTXROLNM3G2E3QUNIPYY4XUNK4WTEPNVYXWWACEJXCV3XVU6H56RQTR35RWEI5HX23YZHY2OVFSVCS2BDMGWJY');
    expect(wallet.getPublicKeyString()).toBe('NMAEITOFLXPLJ4P35DBHDX3DMIR2PPVXRSPRU5KLFKFFUCGYNMTQ');
    expect(wallet.getAddressString()).toBe('0x3b7dd9aa1884b2a70d39dda14428e8cbc80428ec');
  });

  it('generate a wallet from a seed', () => {
    const seedPhrase = 'fee talk ride output ignore turkey social label owner twist disagree shallow';
    const seed = bip39.mnemonicToSeedSync(seedPhrase).toString('hex');
    const data = derivePath("m/44'/42069'/1'", seed);
    const wallet = Wallet.generateFromSeed(new Uint8Array(data.key));
    expect(wallet.getPrivateKeyString()).toBe('CVXWTP2YZJKUP7HROU6YCBPSR7HJGBBZVYE5PXDNY2GAVFWKFDQUFALZ7FU5RCKCPOEZASHV7VWPEQ3IWYDIMW5NJMCGPBMSDUWCGPA');
    expect(wallet.getPublicKeyString()).toBe('IKAXT6LJ3CEUE64JSBEPL7LM6JBWRNQGQZN22SYEM6CZEHJMEM6A');
    expect(wallet.getAddressString()).toBe('0xd1ff442e2421de40575979990bf2cdb74b67a0b7');
  });

  it('throws an error for invalid private Key', () => {
    const privateKey = new Uint8Array([
      79, 164, 29, 195, 12, 14, 180, 141, 78, 133,
      39, 120, 185, 109, 102, 205, 162, 110, 20, 106, 31,
      140, 114, 244, 106, 185, 105, 145, 237, 174, 47, 107,
      0, 68, 77, 197, 93, 222, 180, 241, 251, 232, 194,
      113, 223, 99, 98, 35, 167, 190, 183, 140, 159, 26,
      117, 75, 42, 138, 90, 8, 216, 107, 39,
    ]);

    expect(() => new Wallet(privateKey)).toThrowError(/invalid/);
  });

  it('throws an error for invalid public Key', () => {
    const publicKey = new Uint8Array([
      79, 164, 29, 195, 12, 14, 180, 141, 78, 133,
      39, 120, 185, 109, 102, 205, 162, 110, 20, 106, 31,
      140,
    ]);

    expect(() => new Wallet(undefined, publicKey)).toThrowError(new Error('Invalid public key'));
  });

  it('fails if public and private key is passed to constructor', () => {
    const privateKey = new Uint8Array([
      106, 79, 164, 29, 195, 12, 14, 180, 141, 78, 133,
      39, 120, 185, 109, 102, 205, 162, 110, 20, 106, 31,
      140, 114, 244, 106, 185, 105, 145, 237, 174, 47, 107,
      0, 68, 77, 197, 93, 222, 180, 241, 251, 232, 194,
      113, 223, 99, 98, 35, 167, 190, 183, 140, 159, 26,
      117, 75, 42, 138, 90, 8, 216, 107, 39,
    ]);

    const publicKey = new Uint8Array([
      79, 164, 29, 195, 12, 14, 180, 141, 78, 133,
      39, 120, 185, 109, 102, 205, 162, 110, 20, 106, 31,
      140,
    ]);

    expect(() => new Wallet(privateKey, publicKey)).toThrowError(new Error('Cannot supply both a private and a public key to the constructor'));
  });

  it('throws error when attempting to get the private key of a public key only wallet', () => {
    const publicKey = new Uint8Array([
      106, 79, 164, 29, 195, 12, 14, 180, 141, 78, 133,
      39, 120, 185, 109, 102, 205, 162, 110, 20, 106, 31,
      140, 114, 244, 106, 185, 105, 145, 237, 174, 47,
    ]);

    const wallet = new Wallet(undefined, publicKey);
    expect(() => wallet.getPrivateKey()).toThrowError(new Error('This is a public key only wallet'));
  });
});
