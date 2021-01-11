import { HardhatUserConfig } from 'hardhat/config'
import '@nomiclabs/hardhat-truffle5'
import "@nomiclabs/hardhat-etherscan"
import "hardhat-typechain"

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/<INFURA_ID>",
      accounts: [ '<PRIVATE_KEY>' ]
    }
  },

  solidity: {
    version: "0.7.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "istanbul"
    }
  },

  typechain: {
    target: 'truffle-v5'
  },

  etherscan: {
    apiKey: "<ETHERSCAN_API_KEY>"
  }
}

export default config
