import Transaction from '@catalyst-net-js/tx';
import Wallet from '@catalyst-net-js/wallet';
import * as protos from '@catalyst-net-js/protocol-sdk-js';
import * as bip39 from 'bip39';
import * as EthUtil from 'ethereumjs-util';
import ProviderEngine from 'web3-provider-engine';
import FiltersSubprovider from 'web3-provider-engine/subproviders/filters';
import HookedSubprovider from 'web3-provider-engine/subproviders/hooked-wallet';
import ProviderSubprovider from 'web3-provider-engine/subproviders/provider';
import * as Url from 'url';
import * as Web3 from 'web3';
import { derivePath } from 'ed25519-hd-key';
import blake2b from 'blake2b';
import NonceSubProvider from './subproviders/nonce-tracker';

import {
  JSONRPCRequestPayload,
  JSONRPCErrorCallback,
  Callback,
  JsonRpcResponse,
} from './types.d';

async function loadWasm() {
  return import('@catalyst-net-js/wasm-ed25519ph');
}


// Important: do not use debug module. Reason: https://github.com/trufflesuite/truffle/issues/2374#issuecomment-536109086

// This line shares nonce state across multiple provider instances. Necessary
// because within truffle the wallet is repeatedly newed if it's declared in the config within a
// function, resetting nonce from tx to tx. An instance can opt out
// of this behavior by passing `shareNonce=false` to the constructor.
// See issue #65 for more
const singletonNonceSubProvider = new NonceSubProvider();


export class HDWalletProvider {
  private walletHdpath: string;

  private wallets: { [address: string]: any };

  private addresses: string[];

  public engine: ProviderEngine;

  constructor(
    mnemonic: string | string[],
    provider: string | any,
    addressIndex: number = 0,
    numAddresses: number = 10,
    shareNonce: boolean = true,
    walletHdpath: string = 'm/44\'/42069\'/',
  ) {
    this.walletHdpath = walletHdpath;
    this.wallets = {};
    this.addresses = [];
    this.engine = new ProviderEngine();

    if (!HDWalletProvider.isValidProvider(provider)) {
      throw new Error(
        [
          `Malformed provider URL: '${provider}'`,
          'Please specify a correct URL, using the http, https, ws, or wss protocol.',
          '',
        ].join('\n'),
      );
    }

    function toHexString(byteArray: Uint8Array) {
      // eslint-disable-next-line no-bitwise
      return Array.prototype.map.call(byteArray, (byte) => (`0${(byte & 0xFF).toString(16)}`).slice(-2)).join('');
    }

    function fromHexString(hexString: any): Uint8Array {
      return new Uint8Array(hexString.match(/.{1,2}/g).map((byte: any) => parseInt(byte, 16)));
    }

    async function signMessage(message: any, pKey: any): Promise<Uint8Array> {
      const signatureLib = await loadWasm();
      const context = new protos.SigningContext();
      context.setNetworkType(protos.NetworkType.TESTNET);
      context.setSignatureType(protos.SignatureType.WEB3_MESSAGE);
      const ctx = context.serializeBinary();
      const contextLength = ctx.length;
      const signature = new Uint8Array(64);
      const public_key = new Uint8Array(64);
      const result = signatureLib.sign(
        signature,
        public_key,
        pKey,
        message,
        ctx,
        contextLength,
      );
      if (result !== protos.ErrorCode.NO_ERROR) {
        throw Error('Failed to sign');
      }
      return signature;
    }

    // private helper to normalize given mnemonic
    const normalizePrivateKeys = (
      seedPhrase: string | string[],
    ): string[] | false => {
      if (Array.isArray(seedPhrase)) return seedPhrase;
      if (seedPhrase && !seedPhrase.includes(' ')) return [seedPhrase];
      // if truthy, but no spaces in mnemonic
      return false; // neither an array nor valid value passed;
    };

    // private helper to check if given mnemonic uses BIP39 passphrase protection
    const checkBIP39Mnemonic = (seedPhrase: string) => {
      if (!bip39.validateMnemonic(seedPhrase)) {
        throw new Error('Mnemonic invalid or undefined');
      }

      const seed = bip39.mnemonicToSeedHex(seedPhrase);

      // crank the addresses out
      for (let i = addressIndex; i < addressIndex + numAddresses; i += 1) {
        const data = derivePath(`${this.walletHdpath + i}'`, seed);
        const wallet = Wallet.generateFromSeed(data.key);

        const address = EthUtil.keccak(Buffer.from(wallet.getPublicKey())).slice(-20);
        const addr = EthUtil.bufferToHex(address);
        this.addresses.push(addr);
        this.wallets[addr] = wallet;
      }
    };

    // private helper leveraging ethUtils to populate wallets/addresses
    const ethUtilValidation = (privateKeys: string[]) => {
      // crank the addresses out
      for (let i = addressIndex; i < privateKeys.length; i += 1) {
        const key = fromHexString(privateKeys[i]);
        const wallet = Wallet.generateFromPrivateKey(key);

        const address = EthUtil.keccak(Buffer.from(wallet.getPublicKey())).slice(-20);
        const addr = EthUtil.bufferToHex(address);
        this.addresses.push(addr);
        this.wallets[addr] = wallet;
      }
    };

    const privateKeys = normalizePrivateKeys(mnemonic);

    if (!privateKeys) checkBIP39Mnemonic(mnemonic as string);
    else ethUtilValidation(privateKeys);

    const tmpAccounts = this.addresses;
    const tmpWallets = this.wallets;

    this.engine.addProvider(
      new HookedSubprovider({
        getAccounts(cb: any) {
          cb(null, tmpAccounts);
        },
        getPrivateKey(address: string, cb: any) {
          if (!tmpWallets[address]) {
            return cb('Account not found');
          }
          return cb(null, tmpWallets[address].getPrivateKeyString());
        },
        async signTransaction(txParams: any, cb: any) {
          let wallet;
          const from = txParams.from.toLowerCase();
          if (tmpWallets[from]) {
            wallet = tmpWallets[from];
          } else {
            cb('Account not found');
          }
          // const tx = await createTx(wallet, txParams);

          const tx = new Transaction(txParams);
          await tx.sign(wallet.getPrivateKey());
          cb(null, toHexString(tx.serialize()));
        },
        async signMessage({ data, from }: any, cb: any) {
          const dataIfExists = data;
          if (!dataIfExists) {
            cb('No data to sign');
          }
          if (!tmpWallets[from]) {
            cb('Account not found');
          }
          const pkey = tmpWallets[from].secretKey;
          const dataBuff = EthUtil.toBuffer(dataIfExists);
          const msgHashBuff = blake2b(64).update(dataBuff).digest();
          const sig = await signMessage(msgHashBuff, pkey);
          cb(null, toHexString(sig));
        },
        async signPersonalMessage(...args: any[]) {
          await this.signMessage(...args);
        },
      }),
    );

    if (!shareNonce) {
      this.engine.addProvider(new NonceSubProvider());
    } else {
      this.engine.addProvider(singletonNonceSubProvider);
    }

    this.engine.addProvider(new FiltersSubprovider());
    if (typeof provider === 'string') {
      // shim Web3 to give it expected sendAsync method. Needed if web3-engine-provider upgraded!
      // Web3.providers.HttpProvider.prototype.sendAsync =
      // Web3.providers.HttpProvider.prototype.send;
      this.engine.addProvider(
        new ProviderSubprovider(
          // @ts-ignore
          new Web3.providers.HttpProvider(provider, { keepAlive: false }),
        ),
      );
    } else {
      this.engine.addProvider(new ProviderSubprovider(provider));
    }
    this.engine.start(); // Required by the provider engine.
  }

  public send(
    payload: JSONRPCRequestPayload,
    callback: JSONRPCErrorCallback | Callback<JsonRpcResponse>,
  ): void {
    return this.engine.send.call(this.engine, payload, callback);
  }

  public sendAsync(
    payload: JSONRPCRequestPayload,
    callback: JSONRPCErrorCallback | Callback<JsonRpcResponse>,
  ): void {
    this.engine.sendAsync.call(this.engine, payload, callback);
  }

  public getAddress(idx?: number): string {
    if (!idx) {
      return this.addresses[0];
    }
    return this.addresses[idx];
  }

  public getAddresses(): string[] {
    return this.addresses;
  }

  public static isValidProvider(provider: string | any): boolean {
    const validProtocols = ['http:', 'https:', 'ws:', 'wss:'];

    if (typeof provider === 'string') {
      const url = Url.parse(provider.toLowerCase());
      return !!(validProtocols.includes(url.protocol || '') && url.slashes);
    }

    return true;
  }
}

export default HDWalletProvider;
