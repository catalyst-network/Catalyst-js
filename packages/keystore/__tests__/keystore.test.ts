
import Wallet from '@catalyst-net-js/wallet';
import Keystore from '../src';


describe('Keystore', () => {
  it('generate a keystore from a wallet', async () => {
    const privateKey = new Uint8Array([
      106, 79, 164, 29, 195, 12, 14, 180, 141, 78, 133,
      39, 120, 185, 109, 102, 205, 162, 110, 20, 106, 31,
      140, 114, 244, 106, 185, 105, 145, 237, 174, 47, 107,
      0, 68, 77, 197, 93, 222, 180, 241, 251, 232, 194,
      113, 223, 99, 98, 35, 167, 190, 183, 140, 159, 26,
      117, 75, 42, 138, 90, 8, 216, 107, 39,
    ]);
    const wallet = await Wallet.generateFromPrivateKey(privateKey);
    const keystore = await Keystore.generateFromWallet(wallet, 'test');

    expect(keystore.getKeystore().Name).toBe('self');
    expect(keystore.getKeystore().Id).toBe('12D3KooWH242bviubcv3HCmZGCF2PNuJfVRL4vrMs1FKKBaHhETG');
  });

  it('generate a wallet from a keystore', async () => {
    const key = {
      Name: 'self',
      Id: '12D3KooWH242bviubcv3HCmZGCF2PNuJfVRL4vrMs1FKKBaHhETG',
      Pem: ` -----BEGIN ENCRYPTED PRIVATE KEY-----
      MIHDMF8GCSqGSIb3DQEFDTBSMDEGCSqGSIb3DQEFDDAkBBChnsxjyrP9HINy9/h8
      gpOUAgInEDAMBggqhkiG9w0CCwUAMB0GCWCGSAFlAwQBKgQQfTMISwFnpba5AwI6
      NEbGdARg3/4/yHuJhLr3YATj/2k4q/U73he+JboNfy0GkDa95U16sTobep/mN9Oa
      ewjTvZS6B6f+BBjq02ZdqvNZ7z9tLrDHHzf6/wm1BOFautq5M0qUyBH6AO+FQO6c
      ujyPf5/T
      -----END ENCRYPTED PRIVATE KEY-----`,
    };
    const keystore = new Keystore(key, 'test');

    expect(keystore.getPrivateKeyString()).toBe('NJH2IHODBQHLJDKOQUTXROLNM3G2E3QUNIPYY4XUNK4WTEPNVYXWWACEJXCV3XVU6H56RQTR35RWEI5HX23YZHY2OVFSVCS2BDMGWJY');
    expect(keystore.getPublicKeyString()).toBe('NMAEITOFLXPLJ4P35DBHDX3DMIR2PPVXRSPRU5KLFKFFUCGYNMTQ');
    expect(keystore.getAddressString()).toBe('0x3b7dd9aa1884b2a70d39dda14428e8cbc80428ec');
  });

  it('generate a wallet from a keythereum keystore', async () => {
    const key = {
      crypto: {
        cipher: 'aes-128-ctr',
        ciphertext: 'df9e84895861152913428945aa462773ad00130d2ee142d9161d5ce034c861b8',
        cipherparams: { iv: '2bc7d83faae523e67529e75f3f50d38f' },
        kdf: 'scrypt',
        mac: '195084fa75ee645d6466de0a981276c29cab651165737e40e0b4ea6d6aacb6bb',
        kdfparams: {
          n: 262144, r: 1, p: 8, dklen: 32, salt: '65e1640e989c6377c15ff1e9c83fb4e9f970169ccd3387b8f16f3c0ea800c1c2',
        },
      },
      id: '2aa1d5d3-e784-43b6-9357-19e433ef2c0c',
      address: 'binsbwdr5cqcvrftf2ivp6mpkmhs6km7vxuekscw6ev6nfn374kf4xzd',
      version: 3,
    };

    const keystore = await Keystore.generateFromKeythereumKeystore(key, 'test');
    expect(keystore.getPrivateKeyString()).toBe('KP3CHDCUDPSZ3SU5QB7FOFB5G26AFROJFERDWDJPML5YSAG74DRJEFBRJ4QASC4RDVXBDDO5NCLQRAVT5SZNJGVHIIG6Z6OJVALOALY');
    expect(keystore.getPublicKeyString()).toBe('SIKDCTZABEFZCHLOCGG522EXBCBLH3FS2SNKOQQN5T44TKAW4AXQ');
    expect(keystore.getAddressString()).toBe('0x530f2f299fade8454856f12be695bbff145e5f23');
  });

  it('generate a keythereum keystore for a wallet', async () => {
    const wallet = Wallet.generate();
    const keystore = await Keystore.generateFromWallet(wallet, 'test');
    const keyObject = keystore.getKeythereumKeystore('test');
    expect(keyObject.crypto.cipher).toBe('aes-128-ctr');
    expect(keyObject.crypto.kdf).toBe('scrypt');
  });
});
