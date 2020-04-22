import nacl from 'tweetnacl';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import Wallet from '../src';
import * as keystore from './keystores/testSigningKey.json';

describe('wallet', () => {
  it('generate a wallet', async () => {
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

  it('generate a wallet from a 32 byte private key', async () => {
    const privateKey = new Uint8Array([127, 48, 34, 53, 99, 185, 121, 164, 36, 105, 99, 181, 199, 214, 100, 86, 232, 86, 252, 27, 157, 215, 201, 215, 103, 175, 9, 117, 218, 61, 198, 24]);
    const extendedPrivateKey = new Uint8Array([
      127, 48, 34, 53, 99, 185, 121, 164, 36, 105, 99,
      181, 199, 214, 100, 86, 232, 86, 252, 27, 157, 215,
      201, 215, 103, 175, 9, 117, 218, 61, 198, 24, 231,
      105, 171, 206, 189, 138, 30, 203, 240, 147, 124, 146,
      111, 63, 16, 219, 227, 235, 78, 140, 112, 78, 83,
      173, 100, 90, 94, 142, 248, 187, 225, 226,
    ]);

    const wallet = await Wallet.generateFromPrivateKey(privateKey);

    expect(JSON.stringify(wallet.getPrivateKey())).toBe(JSON.stringify(extendedPrivateKey));
    expect(wallet.getPrivateKeyString()).toBe('P4YCENLDXF42IJDJMO24PVTEK3UFN7A3TXL4TV3HV4EXLWR5YYMOO2NLZ26YUHWL6CJXZETPH4INXY7LJ2GHATSTVVSFUXUO7C56DYQ');
    expect(wallet.getPublicKeyString()).toBe('45U2XTV5RIPMX4ETPSJG6PYQ3PR6WTUMOBHFHLLELJPI56F34HRA');
    expect(wallet.getAddressString()).toBe('0x9ab25e1388bd336080667d5c4c8342c34474ec9a');
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

  it('generate a wallet from a mnemonic', () => {
    const seedPhrase = 'fee talk ride output ignore turkey social label owner twist disagree shallow';
    const wallet = Wallet.generateFromMnemonic(seedPhrase, 0);
    expect(wallet.getPrivateKeyString()).toBe('QP4QF4WRAIC3INTHOTVD5VQ7X6MTFF3JOVYWXYCE555O7KETOSQSUUICW7HCG75DKEOZQYFZM5WV46MA3BLFHKZ3PTCHYBVNYBJK4ZI');
    expect(wallet.getPublicKeyString()).toBe('FJIQFN6OEN72GUI5TBQLSZ3NLZ4YBWCWKOVTW7GEPQDK3QCSVZSQ');
    expect(wallet.getAddressString()).toBe('0x1ba6a7dc8a769ccc89796d397fdd253aa0c6cf14');
  });

  it('generate a wallet from a keystore', async () => {
    const wallet = await Wallet.generateFromKeystore(keystore, 'test');
    expect(wallet.getPrivateKeyString()).toBe('KP3CHDCUDPSZ3SU5QB7FOFB5G26AFROJFERDWDJPML5YSAG74DRJEFBRJ4QASC4RDVXBDDO5NCLQRAVT5SZNJGVHIIG6Z6OJVALOALY');
    expect(wallet.getPublicKeyString()).toBe('SIKDCTZABEFZCHLOCGG522EXBCBLH3FS2SNKOQQN5T44TKAW4AXQ');
    expect(wallet.getAddressString()).toBe('0x530f2f299fade8454856f12be695bbff145e5f23');
  });

  it('throws an error for an invalid mnemonic', () => {
    const seedPhrase = 'fee talk ride output ignore turkey social label owner twist disagree';
    expect(() => Wallet.generateFromMnemonic(seedPhrase, 0)).toThrowError(new Error('Mnemonic invalid or undefined'));
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
