/* eslint-disable */

import assert from "assert";
import Ganache from "ganache-core";
import * as  nacl from 'tweetnacl'
import * as EthUtil from "ethereumjs-util";
import Web3 from "web3";
import WalletProvider from "../dist";
import { describe, it } from "mocha";

describe("HD Wallet Provider", function() {
  // @ts-ignore
  const web3 = new Web3();
  const port = 8545;
  let server: any;
  let provider: WalletProvider;

  before(done => {
    server = Ganache.server();
    server.listen(port, done);
  });

  after(done => {
    setTimeout(() => server.close(done), 100);
  });

  afterEach(() => {
    web3.setProvider(new Web3.providers.HttpProvider("ws://localhost:8545"));
    provider.engine.stop();
  });

  it("provides for a mnemonic", function(done) {
    const truffleDevAccounts = [
      '0xeba062075dfc52393253e6a9df7a5da220d512da',
      '0xab947e285d5ed19401361cdf41ca3a543b83b3fc',
      '0xff185e4c770ce5be54f0d815b7f698012c82eb9a',
      '0x88c17e02d67f9b68f7fcce1592c1dbd080b03e18',
      '0x8a298b6672980979933a878183ae24b86b3b20f9',
      '0xad4b26b516f2a43253ee6527ed6b4c4e6ffbff38',
      '0xd65bbca5871ae12a983e468f41c24e5b1209a817',
      '0x9e5ce40116e5039b2634f58a449ec78b6d15d59c',
      '0x25cf081e6a693c39b64cd37b629d8841ce304ed0',
      '0xef0329e8964810b73b70bbc2df4c066bcd5ac667',
    ];

    const mnemonic =
      "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
    provider = new WalletProvider(mnemonic, `http://localhost:${port}`);

    assert.deepEqual(provider.getAddresses(), truffleDevAccounts);
    web3.setProvider(provider);

    web3.eth.getBlockNumber((err: Error, number: number) => {
      assert(number === 0);
      done();
    });
  });

  it("throws on invalid mnemonic", function(done) {
    try {
      provider = new WalletProvider(
        "takoyaki is delicious",
        "http://localhost:8545"
      );
      assert.fail("Should throw on invalid mnemonic");
    } catch (e) {
      assert.equal(e.message, "Mnemonic invalid or undefined");
      done();
    }
  });

  it("provides for a private key", function(done) {
    const privateKey =
      "30329f1622aacd6093753a2b6d07e7d95f67bc511a2245008447772ba8b9c7225830bc0b616672c48077fc4e144b6c5700c66e8a15019da4d4ea74ccaeea5c1f"; //random valid private key generated with ethkey
    provider = new WalletProvider(privateKey, `http://localhost:${port}`);
    web3.setProvider(provider);

    const addresses = provider.getAddresses();
    assert.equal(addresses[0], "0xeba062075dfc52393253e6a9df7a5da220d512da");
    addresses.forEach(address => {
      assert(EthUtil.isValidAddress(address), "invalid address");
    });

    web3.eth.getBlockNumber((err: Error, number: number) => {
      assert(number === 0);
      done();
    });
  });

  it("provides for an array of private keys", function(done) {
    function generateKeyFromPrivateKey(key: Uint8Array): nacl.SignKeyPair {
      return nacl.sign.keyPair.fromSecretKey(key)
    };

    function fromHexString(hexString: any): Uint8Array {
      return new Uint8Array(hexString.match(/.{1,2}/g).map((byte: any) => parseInt(byte, 16)));
    };
    const privateKeys = [
      "ccfd141c3a94d3142acc64f5da01a2518e7c9fd56b9443f3098181217c049ab04091f8a67905f4c98550d2b8d406efd949787571c09578726ef2a1f6af21461d",
      "3fd0f533db7abcd571af9bf80e884ec5693ac4ba3d70da468ba752c723aa2f1bcf4b0ef0205b3f2388dda975d69f7ec66e407ccf4f7bb2a6de712f5861374db2"
    ];

    const privateKeysByAddress: { [address: string]: string } = {
      '0x25cf081e6a693c39b64cd37b629d8841ce304ed0':
        'ccfd141c3a94d3142acc64f5da01a2518e7c9fd56b9443f3098181217c049ab04091f8a67905f4c98550d2b8d406efd949787571c09578726ef2a1f6af21461d',
      '0xef0329e8964810b73b70bbc2df4c066bcd5ac667':
        '3fd0f533db7abcd571af9bf80e884ec5693ac4ba3d70da468ba752c723aa2f1bcf4b0ef0205b3f2388dda975d69f7ec66e407ccf4f7bb2a6de712f5861374db2',
    };

    provider = new WalletProvider(privateKeys, `http://localhost:${port}`);
    web3.setProvider(provider);

    const addresses = provider.getAddresses();
    assert.equal(
      addresses.length,
      privateKeys.length,
      "incorrect number of wallets derived"
    );
    addresses.forEach(address => {
      const privateKey = generateKeyFromPrivateKey(fromHexString(privateKeysByAddress[address]));
      const expectedAddress = EthUtil.bufferToHex(EthUtil.keccak(Buffer.from(privateKey.publicKey)).slice(-20));
      assert.equal(
        address,
        expectedAddress,
        "incorrect address for private key"
      );
    });

    web3.eth.getBlockNumber((err: Error, number: number) => {
      assert(number === 0);
      done();
    });
  });
});
