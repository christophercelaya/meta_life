// import pull, {Callback} from 'pull-stream';
// import {imageToImageUrl} from '../utils/from-ssb';
// import cat from 'pull-cat';
// import backoff from 'pull-backoff';
// import switchMap from 'pull-switch-map';
//
// function augmentPeerWithExtras(ssb) {
//   return async ([addr, peer], cb: Callback<[string, any]>) => {
//     // Fetch name and image
//     const [, output] = ssb.cachedAboutSelf.get(peer.key);
//     const name = output.name;
//     const imageUrl = imageToImageUrl(output.image);
//
//     // Fetch 'isInDB' boolean
//     const [, isInDB] = ssb.connUtilsBack.isInDB(addr);
//
//     cb(null, [addr, {name, imageUrl, isInDB, ...peer}]);
//   };
// }
//
// function augmentPeersWithExtras(ssb) {
//   return async (kvs: Array, cb: Callback<Array>) => {
//     const peers: Array = [];
//     for (const kv of kvs) {
//       const [err, peer] = augmentPeerWithExtras(ssb)(kv);
//       if (err) {
//         cb(err);
//         return;
//       }
//       peers.push(peer);
//     }
//     cb(null, peers);
//   };
// }
//
// function removeOlderDuplicates(kvs: Array) {
//   // Only allow those that don't have a newer duplicate
//   return kvs.filter(([_addr1, peer1]) => {
//     const newerDuplicate = kvs.find(([_addr2, peer2]) => {
//       if (!peer2.key) {
//         return false;
//       }
//       if (peer2.key !== peer1.key) {
//         return false;
//       }
//       if (peer1.hubUpdated && peer2.hubUpdated) {
//         return peer2.hubUpdated > peer1.hubUpdated;
//       }
//       if (peer1.stagingUpdated && peer2.stagingUpdated) {
//         return peer2.stagingUpdated > peer1.stagingUpdated;
//       }
//       return false;
//     });
//     return !newerDuplicate;
//   });
// }
//
// export const connUtils = {
//   name: 'connUtils',
//
//   init: ssb => {
//     return {
//       persistentConnect(address: string, data: any, cb: Callback<any>) {
//         return ssb.connUtilsBack.persistentConnect(address, data, cb);
//       },
//
//       persistentDisconnect(address: string, cb: Callback<any>) {
//         return ssb.connUtilsBack.persistentDisconnect(address, cb);
//       },
//
//       isInDB(address: string, cb: Callback<boolean>) {
//         return ssb.connUtilsBack.isInDB(address, cb);
//       },
//
//       peers() {
//         return pull(
//           ssb.conn.peers(),
//           switchMap((peers: Array) =>
//             pull(
//               cat([pull.once(0), backoff(2e3, 3.2, 60e3)]), // now, 2, 6, 20, 60
//               pull.map(() => peers),
//             ),
//           ),
//           pull.map(removeOlderDuplicates),
//           pull.through((peers: Array) => {
//             for (const [, data] of peers) {
//               if (data.key) {
//                 ssb.cachedAboutSelf.invalidate(data.key);
//               }
//             }
//           }),
//           pull.asyncMap(augmentPeersWithExtras(ssb)),
//         );
//       },
//
//       stagedPeers() {
//         return pull(
//           ssb.conn.stagedPeers(),
//           pull.map(removeOlderDuplicates),
//           pull.asyncMap(augmentPeersWithExtras(ssb)),
//         );
//       },
//     };
//   },
// };
