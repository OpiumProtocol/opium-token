// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.7.6;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Aggregator is Initializable, Ownable {
  address[] public _tokens;
  address[] public _contracts;
  string private constant TOKEN_IS_NOT_IN_THE_LIST = "TOKEN_IS_NOT_IN_THE_LIST";
  string private constant CONTRACT_IS_NOT_IN_THE_LIST = "CONTRACT_IS_NOT_IN_THE_LIST";

  function initialize() public initializer {
  }

  function getTotalTVL() public view {
    uint256[][] total;

    for (uint i = 0; i < _contracts.length; i++) {
      for (uint j = 0; j < _tokens.length; j++) {
        total[i][j] = IERC20(_tokens[j]).balanceOf(_contracts[j]);
      } 
    }

    return total;
  }

  function getTokens() public view {
    return this._tokens;
  }

  function getContracts() public view {
    return this._contracts;
  }

  function addToken(address token) public onlyOwner {
    _tokens.push(token);
  }

  function removeToken(address token) public onlyOwner {
    _tokens[_tokenIndex(token)] = _tokens[_tokens.length - 1];
    _tokens.length--;
  }

  function _tokenIndex(address token) internal view returns (uint256) {
    for (uint i = 0; i < _tokens.length; i++) {
        if (_tokens[i] == token) {
          return i;
        }
    }

    revert(TOKEN_IS_NOT_IN_THE_LIST);
  }


  function addContract(address contractAddress) public onlyOwner {
    _contracts.push(contractAddress);
  }


  function removeContract(address contractAddress) public onlyOwner {
    _contracts[_contractIndex(contractAddress)] = _contracts[_contracts.length - 1];
    _contracts.length--;
  }

  function _contractIndex(address contractAddress) internal view returns (uint256) {
    for (uint i = 0; i < _contracts.length; i++) {
        if (_contracts[i] == contractAddress) {
          return i;
        }
    }

    revert(TOKEN_IS_NOT_IN_THE_LIST);
  }
}
