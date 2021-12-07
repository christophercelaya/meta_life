/**
 * Created on 08 Dec 2021 by lonmee
 */
const logFn =
  process.platform == 'darwin'
    ? console.log
    : require('rn-bridge').channel.send;

module.exports = logFn;
