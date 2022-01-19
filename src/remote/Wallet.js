/**
 * Created on 15 Jan 2022 by lonmee
 */

import Web3 from 'web3';

const rpcUrl = 'https://jsonapi1.smartmesh.cn',
  chainID = '20180430',
  symbol = 'SMT',
  BEUrl = 'https://spectrum.pub/';
let web3;
export const initWeb3 = () => {
  const provider = new Web3.providers.HttpProvider(rpcUrl, {});
  web3 = new Web3(provider);
  web3.eth.getBlock('latest').then(console.log);
};

export const getBalance = (
  pk = '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
  cb = null,
) =>
  web3.eth
    .getBalance(pk)
    .then(cb)
    .catch(error => console.warn);

export const doTransaction = (
  pk = '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
  cb = null,
) =>
  web3.eth
    .getBalance(pk)
    .then(cb)
    .catch(error => console.warn);

// privateKey: '05aec557911fa0c26eef81ad2b04243eed35292a8ebf7105493845ae98ff3f61';
// Spectrum的调用方法完全遵循Ethereum的标准：
//
// 1.Spectrum主网rpc地址：
// https://jsonapi1.smartmesh.io/
// 2.Spectrum主网chainid:
// 20180430
// 3.MLT合约地址：
// 0xa27f8f580c01db0682ce185209ffb84121a2f711
// 4.MESH合约地址：
// 0xa4c9af589c07b7539e5fcc45975b995a45e3f379
// web3js:
//  https://web3js.readthedocs.io/en/v1.5.2/
// etherjs:
//  https://docs.ethers.io/v5/
