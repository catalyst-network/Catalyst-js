import * as nacl from 'tweetnacl';
import * as protos from '@catalyst-net-js/protocol-sdk-js';
import { bytesFromHexString, bytesFromBase32String, validateProperties } from '@catalyst-net-js/common';
import { TxData, numOrString } from './types';

async function loadWasm() {
  return import('@catalyst-net-js/wasm-ed25519ph');
}

const isHex = (value: numOrString) => /0[xX][0-9a-fA-F]+/.test(value.toString());
const isString = (value: string) => typeof value === 'string';
const isNumber = (value: numOrString, radix: number) => parseInt(value.toString(), radix) === Number(value);


export default class Transaction {
  tx: TxData

  entry: protos.PublicEntry

  schema = {
    nonce: (value: string) => isHex(value) && (isNumber(value, 10) || isNumber(value, 16)),
    gasPrice: (value: string) => isHex(value) && (isNumber(value, 10) || isNumber(value, 16)),
    gasLimit: (value: string) => isHex(value) && (isNumber(value, 10) || isNumber(value, 16)),
    to: (value: string) => isString(value) && isHex(value),
    value: (value: numOrString) => isNumber(value, 10) || isNumber(value, 16),
    data: (value: string) => isString(value) && isHex(value),
  }

  constructor(entry: TxData = {}) {
    this.tx = entry;
    this._createTxEntry();
  }

  private _createTxEntry() {
    const { tx } = this;
    if (!tx.gasLimit) tx.gasLimit = tx.gas;
    if (!tx.to) tx.to = '0x0';
    if (!tx.value) tx.value = '0x0';

    const errors = validateProperties(this.tx, this.schema);

    errors.forEach(({ message }) => { throw new Error(message); });

    this.entry = new protos.PublicEntry();
    this.entry.setReceiverAddress(bytesFromHexString(tx.to));
    this.entry.setAmount(bytesFromHexString(tx.value));
    this.entry.setData(bytesFromHexString(tx.data));
    this.entry.setGasPrice(bytesFromHexString(tx.gasPrice.toString()));
    this.entry.setGasLimit(Number(tx.gasLimit));
    this.entry.setTransactionFees(new Uint8Array(8));
    this.entry.setNonce(Number(tx.nonce));
  }

  private static _getPublicKey(privateKey: Uint8Array): Uint8Array {
    const keypair = nacl.sign.keyPair.fromSecretKey(privateKey);
    return keypair.publicKey;
  }

  private static _getKeypair(privateKey : Uint8Array | string) : any {
    const secret = typeof privateKey === 'string' ? bytesFromBase32String(privateKey) : privateKey;
    return {
      publicKey: Transaction._getPublicKey(secret),
      secretKey: secret.slice(0, 32),
    };
  }

  async sign(privateKey: Uint8Array | string) {
    const { entry } = this;
    const keypair = Transaction._getKeypair(privateKey);
    entry.setSenderAddress(keypair.publicKey);
    const wasm = await loadWasm();
    const context = new protos.SigningContext();
    context.setNetworkType(protos.NetworkType.TESTNET);
    context.setSignatureType(protos.SignatureType.TRANSACTION_PUBLIC);
    const sig = Transaction._signTx(
      entry.serializeBinary(), keypair.secretKey, context.serializeBinary(), wasm,
    );
    const signature = new protos.Signature();
    signature.setSigningContext(context);
    signature.setRawBytes(sig);
    entry.setSignature(signature);
  }

  serialize() {
    const broadcast = new protos.TransactionBroadcast();
    broadcast.setPublicEntry(this.entry);
    return broadcast.serializeBinary();
  }

  private static _signTx(tx: any, privateKey: any, context: Uint8Array, wasm: typeof import('wasm-ed25519ph')) {
    const contextLength = context.length;
    const signature = new Uint8Array(64);
    const result = wasm.sign(
      signature,
      privateKey,
      tx,
      context,
      contextLength,
    );
    if (result !== protos.ErrorCode.NO_ERROR) {
      throw Error('Failed to sign');
    }
    return signature;
  }
}
