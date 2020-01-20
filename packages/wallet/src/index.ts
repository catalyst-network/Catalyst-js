import * as nacl from 'tweetnacl';
import {
  base32StringFromBytes,
  getPublicKeyFromPrivate,
  isValidPrivate,
  isValidPublic,
} from 'common';

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

  public static generateFromPrivateKey(pkey: Uint8Array): Wallet {
    const keypair = nacl.sign.keyPair.fromSecretKey(pkey);
    return new Wallet(keypair.secretKey);
  }

  public static generateFromSeed(seed: Uint8Array): Wallet {
    const keypair = nacl.sign.keyPair.fromSeed(seed);
    return new Wallet(keypair.secretKey);
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
    return this.pubKey;
  }

  public getAddressString(): string {
    return `0x${Wallet._toHexString(this.getAddress())}`;
  }

  private static _toHexString(byteArray: Uint8Array) {
    // eslint-disable-next-line no-bitwise
    return Array.prototype.map.call(byteArray, (byte: any) => (`0${(byte & 0xFF).toString(16)}`).slice(-2)).join('');
  }
}
