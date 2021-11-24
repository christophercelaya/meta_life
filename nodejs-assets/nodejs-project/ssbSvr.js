const SecretStack = require('secret-stack');
const ssbKeys = require('ssb-keys');
const rnBridge = require('rn-bridge');
const rnChannelPlugin = require('multiserver-rn-channel');
const NoauthTransformPlugin = require('multiserver/plugins/noauth');

const config = makeConfig('ssb', {
  connections: {
    incoming: {
      net: [{scope: 'private', transform: 'shs', port: 26831}],
      channel: [{scope: 'device', transform: 'noauth'}],
    },
    outgoing: {
      net: [{transform: 'shs'}],
    },
  },
});

function rnChannelTransport(ssb) {
  ssb.multiserver.transport({
    name: 'channel',
    create: () => rnChannelPlugin(rnBridge.channel),
  });
}

function noAuthTransform(ssb, cfg) {
  ssb.multiserver.transform({
    name: 'noauth',
    create: () =>
      NoauthTransformPlugin({
        keys: {publicKey: Buffer.from(cfg.keys.public, 'base64')},
      }),
  });
}

SecretStack({appKey: require('ssb-caps').shs})
  .use(require('ssb-db'))
  .use(noAuthTransform)
  .use(rnChannelTransport)
  .use(require('ssb-master'))
  .use(require('ssb-conn'))
  .use(require('ssb-blobs'))
  .use(require('ssb-ebt'))
  .call(null, config);
