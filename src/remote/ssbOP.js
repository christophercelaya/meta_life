/* sync */
// global
import nodejs from 'nodejs-mobile-react-native';
import {makeClient} from './ssb/Client';

export const status = (ssb, cb) =>
  ssb.status((e, v) => (e ? console.error(e) : cb(v)));
// conn
export const stage = (ssb, cb) =>
  ssb.conn.stage((e, v) => (e ? console.error(e) : cb(v)));
export const connStart = (ssb, cb) =>
  ssb.conn.start((e, v) => (e ? console.error(e) : cb(v)));
/* async */
export const follow = (ssb, fid, opts, cb) => {
  ssb.friends.follow(fid, opts, (e, v) => (e ? console.error(e) : cb(v)));
};
export const isFollowing = (ssb, source, dest, cb) => {
  ssb.friends.isFollowing({source, dest}, cb);
};
export const connectPeer = ({ssb, address, data}) =>
  ssb.conn.connect(address, data, (e, v) =>
    e ? console.error(e) : console.log(v),
  );

/* source */
export const reqStagedPeers = (ssb, cb) =>
  ssb.conn.stagedPeers()(null, (e, v) => (e ? console.error(e) : cb(v)));
export const reqConnectedPeers = (ssb, cb) =>
  ssb.conn.peers()(null, (e, v) => (e ? console.error(e) : cb(v)));
export const reqBlobsGet = (ssb, cb) =>
  ssb.blobs.get()(null, (e, v) => (e ? console.error(e) : cb(v)));

/* sink */
// ssb.blobs.add()

/* duplex */
export const ping = ssb =>
  ssb.conn.ping()(null, (e, v) => (e ? console.error(e) : console.log(v)));

// ???
// ssb.deweird.source(['threads', 'publicSummary'],{})(null,(e, v)=>console.log(v))

export const reqStartSSB = setInstance => {
  const {channel} = nodejs;
  channel.addListener(
    'identity',
    msg =>
      msg === 'IDENTITY_READY' &&
      makeClient()
        .then(setInstance)
        .catch(error => console.error('ssb start error: ' + error)),
  );
  channel.post('identity', 'CREATE');
};
