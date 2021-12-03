const {app, channel} = require('rn-bridge');
const fs = require('fs');
const path = require('path');
const os = require('os');
channel.on('message', msg => {
  switch (msg) {
    case 'nodeInfo':
      const {version, platform, arch, env} = process;
      return channel.send({
        version,
        platform,
        arch,
        env,
        app,
        datadir: app.datadir(),
      });
    case 'startSsb':
      return startSsb();
    default:
      channel.send(`nothing did with '${msg}'`);
  }
});

channel.send('Node was initialized.');

// Set default directories
const appDataDir = (process.env.APP_DATA_DIR = app.datadir());
process.env.SSB_DIR = path.resolve(appDataDir, '.ssb');
const nodejsProjectDir = path.resolve(appDataDir, 'nodejs-project');
os.homedir = () => nodejsProjectDir;
process.cwd = () => nodejsProjectDir;

// process.env.CHLORIDE_JS = 'yes'; // uncomment to enable WASM libsodium
if (fs.existsSync(path.join(process.env.SSB_DIR, 'DETAILED_LOGS'))) {
  process.env.DEBUG = '*';
}

// Report JS backend crashes to Java, and in turn, to ACRA
process.on('unhandledRejection', reason => {
  console.error(reason);
  channel.post('exception', reason);
  setTimeout(() => {
    process.exit(1);
  });
});

process.on('uncaughtExceptionMonitor', err => {
  console.error(err);
  if (typeof err === 'string') {
    channel.post('exception', err);
  } else {
    channel.post('exception', err.message + '\n' + err.stack);
  }
});

channel.send('SSB prepared.');

function startSsb() {
  require('./ssb');
}
