import { BaseEntry, PublicEntry } from '../generated/Transaction_pb';
import { Signature, SigningContext, SignatureType } from '../generated/Cryptography_pb';
import { NetworkType } from '../generated/Network_pb';
import { TransactionBroadcast } from '../generated/Wire_pb';
import { bytesFromHexString } from './utils/index';
import { sign } from './pkg/dist/index';

function signTx(tx: any, wallet: any, context: Uint8Array) {
  const contextLength = context.length;
  const signature = new Uint8Array(64);
  const result = sign(
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

function transaction(wallet: any, txParams: any): Uint8Array {
  // Example txParams
  // const txParams = {
  //   from: '0x0000000000000000000000000000000000000000',
  //   nonce: '0x00',
  //   gasPrice: '0x09184e72a000',
  //   gasLimit: '0x2710',
  //   to: '0x0000000000000000000000000000000000000000',
  //   value: '0x00',
  //   data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
  // }


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
  entry.setGasLimit(parseInt(txParams.gasLimit, 16));

  const context = new SigningContext();
  context.setNetworkType(NetworkType.TESTNET);
  context.setSignatureType(SignatureType.TRANSACTION_PUBLIC);

  const sig = signTx(entry.serializeBinary(), wallet, context.serializeBinary());

  const signature = new Signature();
  signature.setSigningContext(context);
  signature.setRawBytes(sig);

  entry.setSignature(signature);

  const broadcast = new TransactionBroadcast();
  broadcast.setPublicEntry(entry);

  return broadcast.serializeBinary();
}

export default transaction;
