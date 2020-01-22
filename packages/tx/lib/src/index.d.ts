import * as protos from 'protocol-sdk-js';
import { TxData } from './types';
export default class Transaction {
    tx: TxData;
    entry: protos.PublicEntry;
    constructor(entry?: TxData);
    private _createTxEntry;
    private static _getPublicKey;
    private static _getKeypair;
    sign(privateKey: Uint8Array | string): Promise<void>;
    serialize(): Uint8Array;
    private static _signTx;
}
