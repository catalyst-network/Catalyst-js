import * as nacl from 'tweetnacl';
import * as protos from 'protocol-sdk-js';
import { bytesFromHexString, bytesFromBase32String } from './utils/index';
import { TxData } from './types';

async function loadWasm() {
  return import('wasm-ed25519ph');
}

export default class Transaction {
  tx: TxData

  entry: protos.PublicEntry

  constructor(entry: TxData = {}) {
    this.tx = entry;
    this._createTxEntry();
  }


  private _createTxEntry() {
    const { tx } = this;

    if (!tx.value) {
      tx.value = '0x0';
    }

    if (!tx.to) {
      tx.to = '';
    }

    this.entry = new protos.PublicEntry();
    this.entry.setReceiverAddress(bytesFromHexString(tx.to));
    this.entry.setAmount(bytesFromHexString(tx.value));
    this.entry.setData(bytesFromHexString(tx.data));
    this.entry.setGasPrice(bytesFromHexString(tx.gasPrice));
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
    if (result !== 418) {
      throw Error('Failed to sign');
    }
    return signature;
  }
}
