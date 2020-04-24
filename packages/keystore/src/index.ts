import crypto from 'libp2p-crypto';
import * as peerId from 'peer-id';
import { composePrivateKey, decomposePrivateKey } from 'crypto-key-composer';
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
        console.log(data);
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
      return new Keystore(keystore, password);
    }

    public getPeerId(): string {
      return this._keystore.Id;
    }

    public getKeystore(): KeystoreObject {
      return this._keystore;
    }

    private static async _getPeerIdFromPubKey(publicKey : Uint8Array) {
      const { bytes } = new crypto.keys.supportedKeys.ed25519.Ed25519PublicKey(Buffer.from(publicKey));
      const peerID = await peerId.createFromPubKey(bytes);
      return peerID;
    }
}
