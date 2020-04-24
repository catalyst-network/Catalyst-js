import crypto from 'libp2p-crypto';
import * as peerId from 'peer-id';
import { composePrivateKey, decomposePrivateKey } from 'crypto-key-composer';
import * as keythereum from 'keythereum-pure-js';
import randomBytes from 'randombytes';

import Wallet from '@catalyst-net-js/wallet';


interface KeystoreObject {
    Name: string;
    Id: string;
    Pem: string;
}
export default class Keystore extends Wallet {
    _keystore: KeystoreObject;

    constructor(key: KeystoreObject, password?: string, wallet? : Wallet) {
      if (!wallet) {
        const data: any = decomposePrivateKey(key.Pem, { format: 'pkcs8-pem', password });
        super(data.keyData.seed);
      } else {
        super(wallet.getPrivateKey());
      }
      this._keystore = key;
    }

    public static async generateFromWallet(wallet: Wallet, password: string, name: string = 'self'): Promise<Keystore> {
      const privateKey = wallet.getPrivateKey();
      const pem: any = composePrivateKey({
        format: 'pkcs8-pem',
        keyAlgorithm: {
          id: 'ed25519',
        },
        keyData: {
          seed: privateKey,
        },
      }, { password });
      const keystore = {
        Name: name,
        Id: (await Keystore._getPeerIdFromPubKey(wallet.getPublicKey())).toB58String(),
        Pem: pem,
      };
      return new Keystore(keystore, password, wallet);
    }

    public static async generateFromKeythereumKeystore(key: any, password: string, name: string): Promise<Keystore> {
      const privateKey = keythereum.recover(password, key);
      const wallet = await Wallet.generateFromPrivateKey(new Uint8Array(privateKey));
      return Keystore.generateFromWallet(wallet, password, name);
    }

    public getPeerId(): string {
      return this._keystore.Id;
    }

    public getKeystore(): KeystoreObject {
      return this._keystore;
    }

    public getKeythereumKeystore(password: string, keyLength: number = 32, ivLength: number = 16) {
      const random = randomBytes(keyLength + ivLength + keyLength);
      const iv = random.slice(keyLength, keyLength + ivLength);
      const salt = random.slice(keyLength + ivLength);
      const options = {
        kdf: 'scrypt',
        cipher: 'aes-128-ctr',
        kdfparams: {
          n: 262144,
          r: 1,
          p: 8,
          dklen: 32,
          prf: 'hmac-sha256',
        },
      };
      const secret = Buffer.from(this.getPrivateKey().slice(0, 32));
      return keythereum.dump(password, secret, salt, iv, options, null);
    }

    private static async _getPeerIdFromPubKey(publicKey : Uint8Array) {
      const { bytes } = new crypto.keys.supportedKeys.ed25519.Ed25519PublicKey(Buffer.from(publicKey));
      const peerID = await peerId.createFromPubKey(bytes);
      return peerID;
    }
}
