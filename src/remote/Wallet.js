/**
 * Created on 15 Jan 2022 by lonmee
 */
const params = {
  rpcUrl: 'https://jsonapi1.smartmesh.cn',
  chainID: '20180430',
  symbol: 'SMT',
  BEUrl: 'https://spectrum.pub/',
};

import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

// Spectrum的调用方法完全遵循Ethereum的标准：
//
// 1.Spectrum主网rpc地址：
// https://jsonapi1.smartmesh.io/
//
//     2.Spectrum主网chainid:
//     20180430
//
// 3.MLT合约地址：
// 0xa27f8f580c01db0682ce185209ffb84121a2f711
//
// 4.MESH合约地址：
// 0xa4c9af589c07b7539e5fcc45975b995a45e3f379
//
// web3js:
//  https://web3js.readthedocs.io/en/v1.5.2/
//
// etherjs:
//  https://docs.ethers.io/v5/
