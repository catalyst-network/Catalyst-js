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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("common");
const src_1 = __importDefault(require("../src"));
const txData = {
    nonce: '0x00',
    gasPrice: '0x09184e72a000',
    gasLimit: '0x2710',
    to: '0x0000000000000000000000000000000000000000',
    value: '0x00',
    data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
};
const tx = new src_1.default(txData);
const base32Key = 'UUDZCB5QPOQP7YS6P224QP3PR77USPENK37VQX3HIKENZI6DC7GMINPQLEDNQ42YDAF3IHCXOVFHWC7KZY6MQ4TW4Y7JQJDWQWR7VCA';
describe('tx', () => {
    it('creates a tx', () => {
        const amount = tx.entry.getAmount();
        const gasPrice = tx.entry.getGasPrice();
        const gasLimit = tx.entry.getGasLimit();
        const receiver = tx.entry.getReceiverAddress();
        const nonce = tx.entry.getNonce();
        expect(gasLimit).toBe(10000);
        expect(nonce).toBe(0);
        expect(JSON.stringify(amount)).toBe(JSON.stringify(new Uint8Array([0])));
        expect(JSON.stringify(gasPrice)).toBe(JSON.stringify(new Uint8Array([9, 24, 78, 114, 160, 0])));
        expect(JSON.stringify(receiver)).toBe(JSON.stringify(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])));
    });
    it('signs a tx', (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.sign(base32Key);
        const sender = tx.entry.getSenderAddress_asB64();
        const signature = tx.entry.getSignature();
        const signatureContext = signature.getSigningContext();
        expect(sender).toBe('xDXwWQbYc1gYC7QcV3VKewvqzjzIcnbmPpgkdoWj+og=');
        expect(signatureContext.getNetworkType()).toBe(3);
        expect(signatureContext.getSignatureType()).toBe(1);
        expect(signature.getRawBytes_asB64()).toBe('92TEDIKFr86siJyZVvJ0a7lcUmtsmLiPUdDe9uD08yuYis0wNgol9jWR7LWS3mr1WMthnThYiWwdnJ1AbCCdBA==');
        done();
    }));
    it('serializes a tx', () => {
        const serializedTx = tx.serialize();
        expect(common_1.base32StringFromBytes(serializedTx)).toBe('BLAACCQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACIQMINPQLEDNQ42YDAF3IHCXOVFHWC7KZY6MQ4TW4Y7JQJDWQWR7VCA2AEACEJD7ORSXG5BSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAACXGIDASGCOOKQAAOEQJZBAQAAAAAAAAAAAABJEQCQEBABRAAISID3WJRAMQKC27TVMRCOJSVXSORV3SXCSNNWJROEPKHIN55XA6TZSXGEKZUYDMCRF6Y2ZD3FVSLPGV5KYZNQZ2OCYRFWB3HE5IBWCBHIE');
    });
});
