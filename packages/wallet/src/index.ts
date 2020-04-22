import * as nacl from 'tweetnacl';
import * as peerId from 'peer-id';
import crypto from 'libp2p-crypto';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import * as keythereum from 'keythereum-pure-js';
import {
  base32StringFromBytes,
  getPublicKeyFromPrivate,
  isValidPrivate,
  isValidPublic,
  addressFromPublicKey,
} from '@catalyst-net-js/common';


async function loadWasm() {
  return import('@catalyst-net-js/wasm-ed25519ph');
}

export default class Wallet {
  constructor(
      private readonly privateKey?: Uint8Array | undefined,
      private publicKey: Uint8Array | undefined = undefined,
  ) {
    if (privateKey && publicKey) {
      throw new Error('Cannot supply both a private and a public key to the constructor');
    }

    if (privateKey && !isValidPrivate(privateKey)) {
      throw new Error('Private key does not satisfy the curve requirements (ie. it is invalid)');
    }

    if (publicKey && !isValidPublic(publicKey)) {
      throw new Error('Invalid public key');
    }
  }

  // Wallet constructors

  public static generate(): Wallet {
    const keypair = nacl.sign.keyPair();
    return new Wallet(keypair.secretKey);
  }

  public static async generateFromPrivateKey(pKey: Uint8Array): Promise<Wallet> {
    let secretKey = pKey;
    if (pKey.length !== 64) {
      const publicKey = await this._publicKeyFor32BytePrivateKey(pKey);
      secretKey = new Uint8Array(64);
      secretKey.set(pKey);
      secretKey.set(publicKey, pKey.length);
    }

    const keypair = nacl.sign.keyPair.fromSecretKey(secretKey);
    return new Wallet(keypair.secretKey);
  }

  public static generateFromSeed(seed: Uint8Array): Wallet {
    const keypair = nacl.sign.keyPair.fromSeed(seed);
    return new Wallet(keypair.secretKey);
  }

  public static generateFromMnemonic(mnemonic: string, index: number = 0, walletHdPath: string = 'm/44\'/42069\'/'): Wallet {
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error('Mnemonic invalid or undefined');
    }

    const masterSeed = bip39.mnemonicToSeedSync(mnemonic).toString('hex');
    const { key } = derivePath(`${walletHdPath + index}'`, masterSeed);
    return Wallet.generateFromSeed(new Uint8Array(key));
  }

  // private getters
  private get pubKey(): Uint8Array {
    if (!this.publicKey) {
      this.publicKey = getPublicKeyFromPrivate(this.privateKey);
    }
    return this.publicKey;
  }

  private get privKey(): Uint8Array {
    if (!this.privateKey) {
      throw new Error('This is a public key only wallet');
    }
    return this.privateKey;
  }

  // public getters
  public getPrivateKey(): Uint8Array {
    return this.privKey;
  }

  public getPrivateKeyString(): string {
    return base32StringFromBytes(this.privKey);
  }

  public getPublicKey(): Uint8Array {
    return this.pubKey;
  }

  public getPublicKeyString(): string {
    return base32StringFromBytes(this.getPublicKey());
  }

  public getAddress(): Uint8Array {
    return addressFromPublicKey(this.pubKey);
  }

  public getAddressString(): string {
    return `0x${Wallet._toHexString(this.getAddress())}`;
  }

  public async getPeerId(): Promise<string> {
    const privateKeyBuffer = Buffer.from(this.privKey);
    const publicKeyBuffer = Buffer.from(this.pubKey);
    const key = new crypto.keys.supportedKeys.ed25519.Ed25519PrivateKey(privateKeyBuffer, publicKeyBuffer);
    const protobuff = key.bytes;
    const peerID = await peerId.createFromPrivKey(protobuff);
    return peerID.toB58String();
  }

  private static async _publicKeyFor32BytePrivateKey(privateKey: Uint8Array) : Promise<Uint8Array> {
    const wasmLib = await loadWasm();
    const publicKey = new Uint8Array(32);
    wasmLib.public_key_from_private(publicKey, privateKey);
    return publicKey;
  }

  private static _toHexString(byteArray: Uint8Array) {
    // eslint-disable-next-line no-bitwise
    return Array.prototype.map.call(byteArray, (byte: any) => (`0${(byte & 0xFF).toString(16)}`).slice(-2)).join('');
  }
}
