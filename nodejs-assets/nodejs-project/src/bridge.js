/**
 * Created on 07 Dec 2021 by lonmee
 */
let logFn;
try {
  logFn = require('rn-bridge');
} catch (e) {
  logFn = console.log;
}
module.exports = logFn;
