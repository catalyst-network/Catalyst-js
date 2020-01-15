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



// export function signMessage(message: any, pKey: any): Uint8Array {
//   return nacl.sign(message, pKey);
// }

// async function transaction(wallet: any, txParams: any): Promise<Uint8Array> {
//   if(!txParams.value) {
//     txParams.value = '0x0';
//   }

//   if(!txParams.to) {
//     txParams.to = '';
//   }

//   const base = new BaseEntry();
//   base.setNonce(parseInt(txParams.nonce, 16));
//   base.setReceiverPublicKey(bytesFromHexString(txParams.to));
//   base.setSenderPublicKey(wallet.publicKey);
//   base.setTransactionFees(new Uint8Array(8));

//   const entry = new PublicEntry();
//   entry.setBase(base);
//   entry.setAmount(bytesFromHexString(txParams.value));
//   entry.setData(bytesFromHexString(txParams.data));
//   entry.setTimestamp();
//   entry.setGasPrice(bytesFromHexString(txParams.gasPrice));
//   entry.setGasLimit(parseInt(txParams.gas, 16));

//   const context = new SigningContext();
//   context.setNetworkType(NetworkType.TESTNET);
//   context.setSignatureType(SignatureType.TRANSACTION_PUBLIC);

//   const wasm = await loadWasm();
//   const sig = signTx(entry.serializeBinary(), wallet, context.serializeBinary(), wasm);

//   const signature = new Signature();
//   signature.setSigningContext(context);
//   signature.setRawBytes(sig);

//   entry.setSignature(signature);

//   const broadcast = new TransactionBroadcast();
//   broadcast.setPublicEntry(entry);
  
//   return broadcast.serializeBinary();
// }

export default class Transaction {
  txs: TxData[]
  entries: PublicEntry[]


  constructor(entries: TxData[] = []) {
    this.txs = entries;
    this._createTxEntries();
  }

  private _createTxEntries() {
    this.txs.forEach((tx) => {
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

    const entry = new PublicEntry();
    entry.setBase(base);
    entry.setAmount(bytesFromHexString(tx.value));
    entry.setData(bytesFromHexString(tx.data));
    entry.setTimestamp();
    entry.setGasPrice(bytesFromHexString(tx.gasPrice));
    entry.setGasLimit(parseInt(tx.gas, 16));
    this.entries.push(entry);
    });
  }

  private _getPublicKey(privateKey: Uint8Array) {
    const keypair = nacl.sign.keyPair.fromSecretKey(privateKey);
    return keypair.publicKey;
  }

  async sign(privateKey: Buffer, opt?: object){
    const broadcast = new TransactionBroadcast();

    const wasm = await loadWasm();
    this.entries.forEach((entry: PublicEntry) => {
      const context = new SigningContext();
      context.setNetworkType(NetworkType.TESTNET);
      context.setSignatureType(SignatureType.TRANSACTION_PUBLIC);
      const sig = this._signTx(entry.serializeBinary(), privateKey, context.serializeBinary(), wasm);
      const signature = new Signature();
      signature.setSigningContext(context);
      signature.setRawBytes(sig);
      entry.setSignature(signature);
      broadcast.setPublicEntry(entry);
    });
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