import KeychainLib from 'libp2p-keychain';
import crypto from 'libp2p-crypto';
import * as peerId from 'peer-id';
import { composePrivateKey, decomposePrivateKey } from 'crypto-key-composer';
import Wallet from '@catalyst-net-js/wallet';

export default class Keychain {
    _keychain: KeychainLib;

    constructor(store: any, password: any) {
      this._keychain = new KeychainLib(store, { passPhrase: password });
    }

    /**
     * Import a  catalys-js wallet to your keychain
     * @param {string} name
     * @param {Wallet} wallet
     * @returns {KeychainLib.KeyInfo}
     */
    async importWallet(name: string, wallet: Wallet): Promise<KeychainLib.KeyInfo> {
      const privateKey = wallet.getPrivateKey();
      const privateKeyBuffer = Buffer.from(privateKey);
      const key = new crypto.keys.supportedKeys.ed25519.Ed25519PublicKey(privateKeyBuffer);
      const protobuff = key.bytes;
      const peer = await peerId.createFromPrivKey(protobuff);

      return this._keychain.importPeer(name, peer);
    }

    async exportWallet(name: string, password: string) {
      const pem = this.exportKeystore(name, password);
      const data = decomposePrivateKey(pem, { password });
      console.log(data);
    }

    async importKeystore(name: string, pem: string, password: string): Promise<KeychainLib.KeyInfo> {
      return this._keychain.importKey(name, pem, password);
    }

    async exportKeystore(name: string, password: string): Promise<string> {
      return this._keychain.exportKey(name, password);
    }
}
