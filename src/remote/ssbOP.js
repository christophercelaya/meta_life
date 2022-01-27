/* sync */
// global
import nodejs from 'nodejs-mobile-react-native';
import {makeClient} from './ssb/Client';

const defaultCallBack = (e, v) => (e ? console.warn(e) : console.log(v));

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

// message
/*ssb.threads.public({
  reverse: true,
  threadMaxSize: 3,
})(null, (e,v)=>console.log(v))*/

/*ssb.threads.private({
  reverse: true,
  threadMaxSize: 3,
})(null, (e,v)=>console.log(v))*/

// resp:
//     messages: Array(1)
// 0:
// key: "%gOvTXcdNCr6YDyArcf62M9oieBhIm8JMG0lw89x06PI=.sha256"
// timestamp: 1641517803516
// value:
//     author: "@dxKK+CtJygjzASfR1KNMpYTYlgHbIKtWzADyxbNJANY=.ed25519"
// content:
//     contact: "@W6Y3xpNCeSbEo3CKg030p3HdxDXHrpdxEbWdXMsTSyI=.ed25519"
// following: true
// type: "contact"
// __proto__: Object
// hash: "sha256"
// previous: "%5kEJx3O1Eol61uHQaxn3QONEsCJc4FjI89umcTlrAKs=.sha256"
// sequence: 5
// signature: "YYq4GdPvg8zN19P1kJKb45DxTaLhpIKui/YV2PSyM+VEYQpXYJEew/V6Oee1xJYqSTaAYXPHXuoD6lFIGkaCCw==.sig.ed25519"
// timestamp: 1641517803509

/*ssb.threads.private({
  reverse: true,
  threadMaxSize: 3,
})(null, (e,v)=>console.log(v))*/
// about self
/*ssb.aboutSelf.get('@g5SfLiisL76D4vO866reU8ioE5deSGOD0CpLq2vw0AA=.ed25519',(e, v)=>console.log(v))*/
/*ssb.aboutSelf.stream('@g5SfLiisL76D4vO866reU8ioE5deSGOD0CpLq2vw0AA=.ed25519')(null, (e,v)=>console.log(v))*/
/* sink */
// ssb.blobs.add()

// ssb.threads.thread({root:'%pLd9INBWxz95rvQMmnCqYgJwk6UgRTK04sdCzG+Xlww=.sha256',private:true})(null,(e,v)=>console.log(v))

// profile
/*ssb.publishUtilsBack.publishAbout({type: 'about',
  about: "@XiFWjglNO9yTW3YPp1M6J6/46T4zBFh3RxeBlagpmAc=.ed25519",
  name:'.zZ',
  description:'bio',
  image: ''},(e,v)=>console.log(v))*/

// isFollowing
/*ssb.friends.isFollowing({source:"@XKv0b06yUZ30Va8RZAnijtMl3MdrDgHX677yTE6cFDY=.ed25519",dest:"@azYm7/Ae3TPvpQynRPsc+Wc8TbGOlQoiipfQfM6PIxQ=.ed25519"},(e,v)=>console.log(v))*/

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
  // rn.send('RESTORE: word0 word1...');
  // channel.post('identity', 'RESTORE: word0 word1...');
};

export const addPublicUpdatesListener = (ssb, cb = null) => {
  ssb.threads.publicUpdates({
    reverse: true,
    threadMaxSize: 1,
  })(null, (e, v) => {
    if (e) {
      console.log('add public updates listener error:', e);
    } else {
      console.log('public msg update with: ', v);
      cb && cb(v);
      addPublicUpdatesListener(ssb, cb);
    }
  });
};

export const addPrivateUpdatesListener = (ssb, cb = null) => {
  ssb.threads.privateUpdates({
    reverse: true,
    threadMaxSize: 1,
  })(null, (e, v) => {
    if (e) {
      console.log('add private updates listener error:', e);
    } else {
      console.log('private msg update with: ', v);
      cb && cb(v);
      addPrivateUpdatesListener(ssb, cb);
    }
  });
};

export const sendMsg = (ssb, content, reps = null) => {
  const opt = {type: 'post', text: content};
  reps && (opt.reps = reps);
  ssb.publish(opt, (e, v) =>
    e
      ? console.warn(e)
      : console.log((reps ? 'private' : 'public') + ' msg sent:', v),
  );
};

export const loadMsg = (ssb, msgKey, isPrivate = false, cb = null) => {
  ssb.threads.thread({
    root: msgKey,
    private: isPrivate,
  })(null, (e, v) => (e ? console.warn(e) : cb ? cb(v) : console.log(v)));
};
