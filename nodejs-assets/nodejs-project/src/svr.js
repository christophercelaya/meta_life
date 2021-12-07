/**
 * Created on 07 Dec 2021 by lonmee
 */
const {channel} = require('src/rn-bridge.js');
const mkdirp = require('mkdirp');
const path = require('path');

mkdirp.sync(process.env.SSB_DIR);
const KEYS_PATH = path.join(process.env.SSB_DIR, 'secret');

const config = makeConfig('ssb', {
  caps,
  keys,
  path: process.env.SSB_DIR,
  db2: {
    maxCpu: 91, // %
    maxCpuWait: 80, // ms
    maxCpuMaxPause: 120, // ms
    automigrate: true,
    dangerouslyKillFlumeWhenMigrated:
      process.env.MANYVERSE_PLATFORM === 'mobile',
  },
  blobs: {
    sympathy: 2,
  },
  blobsPurge: {
    cpuMax: 90, // %
  },
  conn: {
    autostart: false,
    firewall: {
      rejectBlocked: true,
      rejectUnknown: true,
    },
  },
  friends: {
    hops: settingsUtils.readSync().hops ?? 2,
    hookAuth: false, // because we use ssb-conn-firewall
  },
  suggest: {
    autostart: false,
  },
  connections: {
    incoming: {
      net: [{scope: 'private', transform: 'shs', port: 26831}],
      channel: [{scope: 'device', transform: 'noauth'}],
      bluetooth: [{scope: 'public', transform: 'shs'}],
      tunnel: [{scope: 'public', transform: 'shs'}],
    },
    outgoing: {
      net: [{transform: 'shs'}],
      ws: [{transform: 'shs'}],
      bluetooth: [{scope: 'public', transform: 'shs'}],
      tunnel: [{transform: 'shs'}],
    },
  },
});
channel.send('SSB prepared.');
