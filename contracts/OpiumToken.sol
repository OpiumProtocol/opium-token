// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.7.6;

import "@openzeppelin/contracts/contracts/drafts/ERC20Permit.sol";

contract OpiumToken is ERC20Permit {
  constructor() public ERC20Permit("Opium Governance Token") ERC20("Opium Governance Token", "OPIUM") {
    _mint(address(0xDbC2F7f3bCcccf54F1bdA43C57E8aB526e379DF1), 100_000_000e18);
  }
}
