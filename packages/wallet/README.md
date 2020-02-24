<div align="center">
  <img alt="ReDoc logo" src="https://raw.githubusercontent.com/catalyst-network/Community/master/media-pack/logo.png" width="400px" />

  ### Catalyst-js/wallet
 
[![Discord](https://img.shields.io/discord/629667101774446593?color=blueviolet&label=discord)](https://discord.gg/anTP7xm)
[![Twitter Follow](https://img.shields.io/twitter/follow/catalystnetorg?style=social)](https://twitter.com/catalystnetorg)
</div>
A lightweight wallet implementation.

Status: **Active development.** This repository is being actively worked on, mostly in feature branches. 
## Install
`npm install @catalyst-js/wallet`
## Usage
#### Constructors
```javascript
import Wallet from '@catalyst-net-js/wallet'

// create an instance based on a new random key
const wallet = Wallet.generate();

// create an instance based on a raw private key
const wallet = Wallet.generateFromPrivateKey(privateKey);

// create an instance based on a seed
const wallet = Wallet.generateFromSeed(seed);

```
#### Instance methods
```javascript
// return the private key
const privateKey = wallet.getPrivateKey(); 
// return the private key as a base32 string
const privateKeyString = wallet.getPrivateKeyString(); 
// return the private key
const privateKey = wallet.getPublicKey(); 
// return the private key as a base32 string
const privateKeyString = wallet.getPublicKeyString(); 
```
## License

[GPLv3](LICENSE)