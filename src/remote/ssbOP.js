// sync
export const connStart = ssb =>
  ssb.conn.start((e, a) =>
    e ? console.error(e) : console.log('connStart: ', a),
  );
export const status = ssb =>
  ssb.status((e, a) => (e ? console.error(e) : console.log('status: ', a)));

// async
export const follow = (ssb, fid, opts, cb) => {
  ssb.friends.follow(fid, opts, (e, a) => (e ? console.error(e) : cb(a)));
};
export const isFollowing = (ssb, source, dest, cb) => {
  ssb.friends.isFollowing({source, dest}, cb);
};
export const connectPeer = ({ssb, address, data}) =>
  ssb.conn.connect(address, data, (e, a) =>
    e ? console.error(e) : console.log(a),
  );

// source
export const reqStagedPeers = (ssb, cb) =>
  ssb.conn.stagedPeers()(null, (e, a) => (e ? console.error(e) : cb(a)));
export const reqConnectedPeers = (ssb, cb) =>
  ssb.conn.peers()(null, (e, a) => (e ? console.error(e) : cb(a)));

// sink
// ssb.blobs.add()

// duplex
export const ping = ssb =>
  ssb.conn.ping()(null, (e, a) => (e ? console.error(e) : console.log(a)));
