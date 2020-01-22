"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const nacl = __importStar(require("tweetnacl"));
const protos = __importStar(require("protocol-sdk-js"));
const common_1 = require("common");
function loadWasm() {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve().then(() => __importStar(require('wasm-ed25519ph')));
    });
}
class Transaction {
    constructor(entry = {}) {
        this.tx = entry;
        this._createTxEntry();
    }
    _createTxEntry() {
        const { tx } = this;
        if (!tx.value) {
            tx.value = '0x0';
        }
        if (!tx.to) {
            tx.to = '';
        }
        this.entry = new protos.PublicEntry();
        this.entry.setReceiverAddress(common_1.bytesFromHexString(tx.to));
        this.entry.setAmount(common_1.bytesFromHexString(tx.value));
        this.entry.setData(common_1.bytesFromHexString(tx.data));
        this.entry.setGasPrice(common_1.bytesFromHexString(tx.gasPrice));
        this.entry.setGasLimit(Number(tx.gasLimit));
        this.entry.setTransactionFees(new Uint8Array(8));
        this.entry.setNonce(Number(tx.nonce));
    }
    static _getPublicKey(privateKey) {
        const keypair = nacl.sign.keyPair.fromSecretKey(privateKey);
        return keypair.publicKey;
    }
    static _getKeypair(privateKey) {
        const secret = typeof privateKey === 'string' ? common_1.bytesFromBase32String(privateKey) : privateKey;
        return {
            publicKey: Transaction._getPublicKey(secret),
            secretKey: secret.slice(0, 32),
        };
    }
    sign(privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const { entry } = this;
            const keypair = Transaction._getKeypair(privateKey);
            entry.setSenderAddress(keypair.publicKey);
            const wasm = yield loadWasm();
            const context = new protos.SigningContext();
            context.setNetworkType(protos.NetworkType.TESTNET);
            context.setSignatureType(protos.SignatureType.TRANSACTION_PUBLIC);
            const sig = Transaction._signTx(entry.serializeBinary(), keypair.secretKey, context.serializeBinary(), wasm);
            const signature = new protos.Signature();
            signature.setSigningContext(context);
            signature.setRawBytes(sig);
            entry.setSignature(signature);
        });
    }
    serialize() {
        const broadcast = new protos.TransactionBroadcast();
        broadcast.setPublicEntry(this.entry);
        return broadcast.serializeBinary();
    }
    static _signTx(tx, privateKey, context, wasm) {
        const contextLength = context.length;
        const signature = new Uint8Array(64);
        const result = wasm.sign(signature, privateKey, tx, context, contextLength);
        if (result !== 418) {
            throw Error('Failed to sign');
        }
        return signature;
    }
}
exports.default = Transaction;
