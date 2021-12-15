const rnBridge = require('rn-bridge');

export const NodeLog = (obj: any) =>
  rnBridge.channel.post('nodeLog', JSON.stringify(obj));

export const NodeException = (obj: any) =>
  rnBridge.channel.post('exception', JSON.stringify(obj));
