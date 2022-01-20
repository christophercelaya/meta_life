/**
 * Created on 23 Dec 2021 by lonmee
 */

export const starter = {
  name: 'starter',
  init: ssb => {
    return {
      greet: cb => ssb.publish({tye: 'post', text: 'Hello world!'}, cb),
      start: cb => ssb.conn.start(cb),
    };
  },
};

export const peers = {
  name: 'peers',
  init: ssb => {
    return {
      // 现身
      stage: cb => ssb.conn.stage(cb),
      // 隐身
      unstage: cb => ssb.conn.unstage(cb),
      // 现身peer
      staged: cb =>
        ssb.conn.stagedPeers()(null, (e, v) => (e ? console.error(e) : cb(v))),
      // 已连接peer
      connected: cb =>
        ssb.conn.peers()(null, (e, v) => (e ? console.error(e) : cb(v))),
      // 连接peer
      connect2Peer: (address, data, cb) => ssb.conn.connect(address, data, cb),
    };
  },
};

// multiserver
// 'net:10.13.230.224:8008~shs:g5SfLiisL76D4vO866reU8ioE5deSGOD0CpLq2vw0AA=;'
// 'net:169.254.53.98:8008~shs:g5SfLiisL76D4vO866reU8ioE5deSGOD0CpLq2vw0AA=;'
// 'net:169.254.36.247:8008~shs:g5SfLiisL76D4vO866reU8ioE5deSGOD0CpLq2vw0AA=;'
// 'ws://10.13.230.224:8989~shs:g5SfLiisL76D4vO866reU8ioE5deSGOD0CpLq2vw0AA=;'
// 'ws://169.254.53.98:8989~shs:g5SfLiisL76D4vO866reU8ioE5deSGOD0CpLq2vw0AA=;'
// 'ws://169.254.36.247:8989~shs:g5SfLiisL76D4vO866reU8ioE5deSGOD0CpLq2vw0AA='
