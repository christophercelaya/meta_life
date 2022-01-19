/**
 * Created on 18 Jan 2022 by lonmee
 */

// Inject node globals into React Native global scope.
global.Buffer = require('buffer').Buffer;
global.process = require('process');

if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    // eslint-disable-next-line no-undef
    return new Buffer(str, 'binary').toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    // eslint-disable-next-line no-undef
    return new Buffer(b64Encoded, 'base64').toString('binary');
  };
}
