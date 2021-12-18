// const pull = require('pull-stream');

// sync
export const connStart = ssb =>
  ssb.conn.start((e, a) =>
    e ? console.error(e) : console.log('conn started with resp: ', a),
  );

// async
export const connectPeer = ({ssb, address, data}) =>
  ssb.conn.connect(address, data, (e, a) =>
    e ? console.error(e) : console.log(a),
  );

// var connectedPeersStream = pull(
//     ssb.conn.peers(),
//     pull.map(entries =>
//         entries.filter(([addr, data]) => data.state === 'connected')
//     )
// )
// pull(connectedPeersStream, pull.drain(console.error, console.log));
// source
export const connectedPeersStream = ssb =>
  ssb.conn.peers()(null, (e, a) => (e ? console.error(e) : console.log(a)));

// sink
// ssb.blobs.add()

// duplex
export const ping = ssb =>
  ssb.conn.ping()(null, (e, a) => (e ? console.error(e) : console.log(a)));
