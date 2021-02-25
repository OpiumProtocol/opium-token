# Opium Governance Token

$OPIUM token is a pure OpenZeppelin ERC20 + Permit

AragonVotingWrapper is contract which exchanges $OPIUM to $wOPIUM and back with 1:1 ratio

## Audit

Opium Governance Token and Aragon Voting Wrapper were audited by [MixBytes](https://mixbytes.io/) and report can be found [here](./audit/OpiumGovernanceTokenAuditMixBytes.pdf)

## Deployment

### Ethereum Mainnet
- OpiumToken was deployed at [0x888888888889c00c67689029d7856aac1065ec11](https://etherscan.io/address/0x888888888889c00c67689029d7856aac1065ec11)
- AragonVotingWrapper was deployed at [0x65402c084f79d698e17f32617f6c4198751dc5a0](https://etherscan.io/address/0x65402c084f79d698e17f32617f6c4198751dc5a0)
# Installation

Run `yarn`

# Compilation

Run `yarn compile`

# Test

1) Copy `hardhat.config.example.ts` -> `hardhat.config.ts`
2) Change `<INFURA_ID>` in `hardhat.config.example.ts`
3) Run `yarn ganache`
4) Run `yarn test`
