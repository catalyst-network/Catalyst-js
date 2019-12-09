import * as nacl from 'tweetnacl';
import { BaseEntry, PublicEntry } from '../generated/Transaction_pb';
import { Signature, SigningContext, SignatureType } from '../generated/Cryptography_pb';
import { NetworkType } from '../generated/Network_pb';
import { TransactionBroadcast } from '../generated/Wire_pb';
import { bytesFromHexString } from './utils/index';

async function loadWasm() {
  return import('../src/wasm');
}

function signTx(tx: any, wallet: any, context: Uint8Array, wasm: typeof import('../src/wasm')) {
  const contextLength = context.length;
  const signature = new Uint8Array(64);
  const result = wasm.sign(
    signature,
    wallet.privateKey,
    tx,
    context,
    contextLength,
  );
  if (result !== 418) {
    throw Error('Failed to sign');
  }
  return signature;
}

export function signMessage(message: any, pKey: any): Uint8Array {
  return nacl.sign(message, pKey);
}

async function transaction(wallet: any, txParams: any): Promise<Uint8Array> {
  if(!txParams.value) {
    txParams.value = '0x0';
  }

  if(!txParams.to) {
    txParams.to = '';
  }

  const base = new BaseEntry();
  base.setNonce(parseInt(txParams.nonce, 16));
  base.setReceiverPublicKey(bytesFromHexString(txParams.to));
  base.setSenderPublicKey(wallet.publicKey);
  base.setTransactionFees(new Uint8Array(8));

  const entry = new PublicEntry();
  entry.setBase(base);
  entry.setAmount(bytesFromHexString(txParams.value));
  entry.setData(bytesFromHexString(txParams.data));
  entry.setTimestamp();
  entry.setGasPrice(bytesFromHexString(txParams.gasPrice));
  entry.setGasLimit(parseInt(txParams.gas, 16));

  const context = new SigningContext();
  context.setNetworkType(NetworkType.TESTNET);
  context.setSignatureType(SignatureType.TRANSACTION_PUBLIC);

  const wasm = await loadWasm();
  const sig = signTx(entry.serializeBinary(), wallet, context.serializeBinary(), wasm);

  const signature = new Signature();
  signature.setSigningContext(context);
  signature.setRawBytes(sig);

  entry.setSignature(signature);

  const broadcast = new TransactionBroadcast();
  broadcast.setPublicEntry(entry);
  
  return broadcast.serializeBinary();
}

export default transaction;
