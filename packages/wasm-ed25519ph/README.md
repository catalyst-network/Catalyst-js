<div align="center">
  <img alt="ReDoc logo" src="https://raw.githubusercontent.com/catalyst-network/Community/master/media-pack/logo.png" width="400px" />

  ### Wasm ed25519ph

[![Build Status](https://dev.azure.com/catalyst-network/wasm-ed25519/_apis/build/status/catalyst-network.wasm-ed25519ph?branchName=master)](https://dev.azure.com/catalyst-network/wasm-ed25519/_build/latest?definitionId=18&branchName=master)[![Discord](https://img.shields.io/discord/629667101774446593?color=blueviolet&label=discord)](https://discord.gg/anTP7xm)
</div>

Provides [ed25519ph](https://github.com/dalek-cryptography/ed25519-dalek) functionality.

## Install

First up make sure you have rustup nightly installed.

If this is a fresh install and you have no rustup toolchain use the following:

```
curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain nightly
```

If you currently have the stable release do

```
rustup install nightly
```

Since we are using nightly you need to override wasm-packs default tool chain by doing...

```
rustup override set nightly
```

Next you need to ensure you have node/npm installed. The easiest way is through node version manager (NVM)

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
nvm install lts/carbon
nvm use lts/carbon
```

For further instructions on NVM refer to their repo https://github.com/nvm-sh/nvm

You can build with:

```npm run build:prod```

Then view using:

```npm run start```

## Contribute

**Take a look at our organization-wide [Contributing Guide](https://github.com/catalyst-network/Community/blob/master/CONTRIBUTING.md).** You'll find most of your questions answered there.

As far as code goes, we would be happy to accept PRs! If you want to work on something, it'd be good to talk beforehand to make sure nobody else is working on it. You can reach us [on Discord](https://discord.gg/anTP7xm), or in the [issues section](https://github.com/catalyst-network/wasm-ed25519ph/issues).

Please note that we have a [Code of Conduct](CODE_OF_CONDUCT.md), and that all activity in the [@catalyst-network](https://github.com/catalyst-network) organization falls under it. Read it when you get the chance, as being part of this community means that you agree to abide by it. Thanks.

## License

[MIT](LICENSE) © 2019 Catalyst Network
