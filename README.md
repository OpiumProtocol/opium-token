# Opium Governance Token

$OPIUM token is a pure OpenZeppelin ERC20 + Permit

AragonVotingWrapper is contract which exchanges $OPIUM to $wOPIUM and back with 1:1 ratio

## Audit

Opium Governance Token and Aragon Voting Wrapper were audited by [MixBytes](https://mixbytes.io/) and report can be found [here](./audit/OpiumGovernanceTokenAuditMixBytes.pdf)
# Installation

Run `yarn`

# Compilation

Run `yarn compile`

# Test

1) Copy `hardhat.config.example.ts` -> `hardhat.config.ts`
2) Change `<INFURA_ID>` in `hardhat.config.example.ts`
3) Run `yarn ganache`
4) Run `yarn test`
