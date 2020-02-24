<div align="center">
  <img alt="ReDoc logo" src="https://raw.githubusercontent.com/catalyst-network/Community/master/media-pack/logo.png" width="400px" />

  ### Catalyst-js/truffle-provider
HD Wallet-enabled Web3 provider for Catalyst. Use it to sign transactions for addresses derived from a 12 or 24 word mnemonic.

[![Discord](https://img.shields.io/discord/629667101774446593?color=blueviolet&label=discord)](https://discord.gg/anTP7xm)
[![Twitter Follow](https://img.shields.io/twitter/follow/catalystnetorg?style=social)](https://twitter.com/catalystnetorg)
</div>


Status: **Active development.** This repository is being actively worked on, mostly in feature branches. 
## Install
`npm install @catalyst-net-js/truffle-provider`
## Usage
truffle-config.js
```javascript
const { HDWalletProvider } = require("@catalyst-net-js/truffle-provider");

const mnemonic = "mountains supernatural bird ...";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    catalyst: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider(mnemonic, <catalyst-node-endpoint>",
      network_id: '1',
    }
  }
};
```
By default, the `HDWalletProvider` will use the address of the first address that's generated from the mnemonic. If you pass in a specific index, it'll use that address instead.

Parameters:

| Parameter | Type | Default | Required | Description |
| ------ | ---- | ------- | ----------- | ----------- |
| `mnemonic` | *`string*` | null | [x] | 12 word mnemonic which addresses are created from. |
| `provider` | `string\|object` | `null` | [x] | URI or catalyst client to send all other non-transaction-related Web3 requests |
| `address_index` | `number` | `0` | [ ] | If specified, will tell the provider to manage the address at the index specified |
| `num_addresses` | `number` | `1` | [ ] | If specified, will create `number` addresses when instantiated |
| `shareNonce` | `boolean` | `true` | [ ] | If false, a new WalletProvider will track its own nonce-state |
| `wallet_hdpath` | `string` | `"m/44'/42069'/0'/0/"` | [ ] | If specified, will tell the wallet engine what derivation path should use to derive addresses. |

## License

[MIT](LICENSE)