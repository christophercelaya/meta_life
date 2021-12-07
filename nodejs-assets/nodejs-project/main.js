const {app, channel} = require('rn-bridge');
const {start} = require('./src/ssb');

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
      return start();
    default:
      channel.send(`nothing did with '${msg}'`);
  }
});

channel.send('Node was initialized.');
