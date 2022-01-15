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
