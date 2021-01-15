// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.7.6;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/contracts/token/ERC20/IERC20.sol";

contract Aggregator is Initializable, OwnableUpgradeable {
  address[] public _tokens;
  address[] public _contracts;
  string private constant TOKEN_IS_NOT_IN_THE_LIST = "TOKEN_IS_NOT_IN_THE_LIST";
  string private constant CONTRACT_IS_NOT_IN_THE_LIST = "CONTRACT_IS_NOT_IN_THE_LIST";

  function initialize() external initializer {
  }

  function getTotalTVL() view external returns (uint256[][] memory) {
    uint256[][] memory total;

    for (uint i = 0; i < _contracts.length; i++) {
      for (uint j = 0; j < _tokens.length; j++) {
        total[i][j] = IERC20(_tokens[j]).balanceOf(_contracts[j]);
      } 
    }

    return total;
  }

  function getTokens() view external returns (address[] memory) {
    return _tokens;
  }

  function getContracts() view external returns (address[] memory) {
    return _contracts;
  }

  function addToken(address token) onlyOwner external {
    _tokens.push(token);
  }

  function removeToken(address token) onlyOwner external {
    _tokens[_tokenIndex(token)] = _tokens[_tokens.length - 1];
    _tokens.pop();
  }

  function _tokenIndex(address token) internal view returns (uint256) {
    for (uint i = 0; i < _tokens.length; i++) {
        if (_tokens[i] == token) {
          return i;
        }
    }

    revert(TOKEN_IS_NOT_IN_THE_LIST);
  }


  function addContract(address contractAddress) onlyOwner external {
    _contracts.push(contractAddress);
  }


  function removeContract(address contractAddress) onlyOwner external {
    _contracts[_contractIndex(contractAddress)] = _contracts[_contracts.length - 1];
    _contracts.pop();
  }

  function _contractIndex(address contractAddress) internal view returns (uint256) {
    for (uint i = 0; i < _contracts.length; i++) {
        if (_contracts[i] == contractAddress) {
          return i;
        }
    }

    revert(CONTRACT_IS_NOT_IN_THE_LIST);
  }
}
