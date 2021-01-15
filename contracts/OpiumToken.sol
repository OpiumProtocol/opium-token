// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.7.6;

import "@openzeppelin/contracts/contracts/drafts/ERC20Permit.sol";

contract OpiumToken is ERC20Permit {
  constructor() public ERC20Permit("Opium Governance Token") ERC20("Opium Governance Token", "OPIUM") {
    _mint(msg.sender, 100_000_000e18);
  }
}
