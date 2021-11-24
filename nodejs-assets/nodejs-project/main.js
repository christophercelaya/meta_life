const {channel} = require('rn-bridge');

channel.on('message', msg => {
  switch (msg) {
    case 'nodeInfo':
      const {version, platform, arch} = process;
      return channel.send({version, platform, arch});
    case 'startSsb':
      return startSsb();
    default:
      channel.send(`nothing did with '${msg}'`);
  }
});

channel.send('Node was initialized.');

function startSsb() {
  const Server = require('ssb-server');
  const config = require('ssb-config');
  const fs = require('fs');
  const path = require('path');

  // add plugins
  Server.use(require('ssb-master'))
    .use(require('ssb-gossip'))
    .use(require('ssb-replicate'))
    .use(require('ssb-backlinks'));

  const server = Server(config);

  // save an updated list of methods this server has made public
  // in a location that ssb-client will know to check
  const manifest = server.getManifest();
  fs.writeFileSync(
    path.join(config.path, 'manifest.json'), // ~/.ssb/manifest.json
    JSON.stringify(manifest),
  );
}
