import * as nacl from 'tweetnacl';

export default class Wallet {
  constructor(
      private readonly privateKey?: Buffer | undefined,
      private publicKey: Buffer | undefined = undefined,
  ) {
    if (privateKey && publicKey) {
      throw new Error('Cannot supply both a private and a public key to the constructor');
    }

    if (privateKey && !ethUtil.isValidPrivate(privateKey)) {
      throw new Error('Private key does not satisfy the curve requirements (ie. it is invalid)');
    }

    if (publicKey && !ethUtil.isValidPublic(publicKey)) {
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
    const keypair = nacl.sign.keyPair.fromSeeed(seed);
    return new Wallet(keypair.secretKey);
  }


  // private getters
  private get pubKey(): Buffer {
    if (!keyExists(this.publicKey)) {
      this.publicKey = ethUtil.privateToPublic(this.privateKey as Buffer);
    }
    return this.publicKey;
  }

  private get privKey(): Buffer {
    if (!keyExists(this.privateKey)) {
      throw new Error('This is a public key only wallet');
    }
    return this.privateKey;
  }

  // public getters
  public getPrivateKey(): Buffer {
    return this.privKey;
  }

  public getPrivateKeyString(): string {
    return ethUtil.bufferToHex(this.privKey);
  }

  // tslint:disable-next-line
  public getPublicKey(): Buffer {
    return this.pubKey;
  }

  public getPublicKeyString(): string {
    return ethUtil.bufferToHex(this.getPublicKey());
  }

  public getAddress(): Buffer {
    return ethUtil.publicToAddress(this.pubKey);
  }

  public getAddressString(): string {
    return ethUtil.bufferToHex(this.getAddress());
  }


  static _toHexString(byteArray: Uint8Array) {
    // eslint-disable-next-line no-bitwise
    return Array.prototype.map.call(byteArray, (byte) => (`0${(byte & 0xFF).toString(16)}`).slice(-2)).join('');
  }

  static _fromHexString(hexString: any): Uint8Array {
    return new Uint8Array(hexString.match(/.{1,2}/g).map((byte: any) => parseInt(byte, 16)));
  }
}
