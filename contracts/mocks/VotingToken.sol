// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.7.6;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/contracts/token/ERC20/ERC20.sol";

contract VotingToken is ERC20 {
  constructor() public ERC20("Opium Governance Aragon Token", "vOPIUM") {
    _mint(msg.sender, 100_000_000e18);
  }
}
