/// ENVVAR
// - ENABLE_GAS_REPORT
// - COMPILE_MODE

require('dotenv').config();

const path = require('path');

require('@nomiclabs/hardhat-truffle5');
require('@nomiclabs/hardhat-solhint');
require('solidity-coverage');

require('hardhat-gas-reporter');
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-web3');
require("@nomiclabs/hardhat-etherscan");
require("hardhat-interface-generator");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.13',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1500,
      },
    },
  },
  networks: {
    hardhat: {
      blockGasLimit: 60000000,
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      chainId: 5,
      accounts: [process.env.GOERLI_PRIVATE_KEY]
    }
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 20,
    coinmarketcap: process.env.COIN_MARKET_CAP_API
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  mocha: {
    timeout: 60000 // 1 minute for test timeout
  }
};

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
