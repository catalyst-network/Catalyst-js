import * as nacl from 'tweetnacl';
import { BaseEntry, PublicEntry } from './protobuffs/Transaction_pb';
import { Signature, SigningContext, SignatureType } from './protobuffs/Cryptography_pb';
import { NetworkType } from './protobuffs/Network_pb';
import { TransactionBroadcast } from './protobuffs/Wire_pb';
import { bytesFromHexString } from './utils/index';
import { TxData } from './types';

async function loadWasm() {
  return import('wasm-ed25519ph');
}

export default class Transaction {
  tx: TxData
  entry: PublicEntry

  constructor(entry: TxData = {}) {
    this.tx = entry;
    this._createTxEntry();
  }

  private _createTxEntry() {
    const { tx } = this
      if(!tx.value) {
        tx.value = '0x0';
      }
    
      if(!tx.to) {
        tx.to = '';
      }

    const base = new BaseEntry();
    base.setNonce(parseInt(tx.nonce, 16));
    base.setReceiverPublicKey(bytesFromHexString(tx.to));
    // base.setSenderPublicKey(wallet.publicKey);
    base.setTransactionFees(new Uint8Array(8));

    this.entry = new PublicEntry();
    this.entry.setBase(base);
    this.entry.setAmount(bytesFromHexString(tx.value));
    this.entry.setData(bytesFromHexString(tx.data));
    this.entry.setTimestamp();
    this.entry.setGasPrice(bytesFromHexString(tx.gasPrice));
    this.entry.setGasLimit(parseInt(tx.gas, 16));
  }

  private _getPublicKey(privateKey: Uint8Array) {
    const keypair = nacl.sign.keyPair.fromSecretKey(privateKey);
    return keypair.publicKey;
  }

  async sign(privateKey: Buffer, opt?: object){
    const broadcast = new TransactionBroadcast();

    const wasm = await loadWasm();
    const { entry } = this;
    const context = new SigningContext();
    context.setNetworkType(NetworkType.TESTNET);
    context.setSignatureType(SignatureType.TRANSACTION_PUBLIC);
    const sig = this._signTx(entry.serializeBinary(), privateKey, context.serializeBinary(), wasm);
    const signature = new Signature();
    signature.setSigningContext(context);
    signature.setRawBytes(sig);
    entry.setSignature(signature);
    broadcast.setPublicEntry(entry);
    
    return broadcast.serializeBinary();
  }

  private _signTx(tx: any, privateKey: any, context: Uint8Array, wasm: typeof import('wasm-ed25519ph')) {
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