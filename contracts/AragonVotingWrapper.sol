// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.7.6;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/contracts/token/ERC20/SafeERC20.sol";

contract AragonVotingWrapper is ReentrancyGuard {
  using SafeERC20 for IERC20;

  event Wrap(address indexed user, uint256 amount);
  event Unwrap(address indexed user, uint256 amount);

  IERC20 public opium;
  IERC20 public voting;
  
  constructor (
    IERC20 _opium,
    IERC20 _voting
  ) public {
    opium = _opium;
    voting = _voting;
  }

  function wrap(uint256 _amount) external {
    _wrap(_amount);
  }

  function _wrap(uint256 _amount) private nonReentrant {
    opium.safeTransferFrom(msg.sender, address(this), _amount);
    voting.safeTransfer(msg.sender, _amount);

    emit Wrap(msg.sender, _amount);
  }

  function unwrap(uint256 _amount) external {
    _unwrap(_amount);
  }

  function _unwrap(uint256 _amount) private nonReentrant {
    voting.safeTransferFrom(msg.sender, address(this), _amount);
    opium.safeTransfer(msg.sender, _amount);

    emit Unwrap(msg.sender, _amount);
  }
}
