// import xs from 'xstream';
// import {Platform} from 'react-native';
// import xsFromCallback from 'xstream-from-callback';
// import runAsync from 'promisify-tuple';
// import ColorHash from 'color-hash';
//
// const URLPolyfill = URL;
// const colorHash = new ColorHash();
// const pull = require('pull-stream');
// const Ref = require('ssb-ref');
// import nodejs from 'nodejs-mobile-react-native';
//
// const {channel} = nodejs;
// import dropRepeats from 'xstream/extra/dropRepeats';
// import xsFromPullStream from 'xstream-from-pull-stream';
// import {imageToImageUrl} from './ssb/utils/from-ssb';
// import {makeClient} from './ssb/Client';
//
// function dropCompletion(stream) {
//   return xs.merge(stream, xs.never());
// }
// class SSBSource {
//   constructor(ssbP) {
//     this.ssb$ = xs.fromPromise(ssbP).compose(dropCompletion).remember();
//     this.selfFeedId$ = this.ssb$.map(ssb => ssb.id).remember();
//     this.publicRawFeed$ = this.ssb$.map(
//       ssb => () => ssb.threadsUtils.publicRawFeed(),
//     );
//     this.publicFeed$ = this.ssb$.map(
//       ssb => opts => ssb.threadsUtils.publicFeed(opts),
//     );
//     this.publicLiveUpdates$ = this.fromPullStream(ssb =>
//       ssb.threadsUtils.publicUpdates(),
//     ).mapTo(null);
//     this.privateFeed$ = this.ssb$.map(
//       ssb => opts => ssb.threadsUtils.privateFeed(opts),
//     );
//     this.privateLiveUpdates$ = this.fromPullStream(ssb =>
//       ssb.threadsUtils.privateUpdates(),
//     );
//     this.preferredReactions$ = this.fromPullStream(ssb =>
//       ssb.dbUtils.preferredReactions(),
//     )
//       .compose(
//         dropRepeats((before, after) => before.join('#') === after.join('#')),
//       )
//       .remember();
//     this.mentionsFeed$ = this.ssb$.map(
//       ssb => () => ssb.threadsUtils.mentionsFeed(),
//     );
//     this.mentionsFeedLive$ = this.fromPullStream(ssb =>
//       ssb.dbUtils.mentionsMe({live: true, old: false}),
//     );
//     this.firewallAttempt$ = this.ssb$.map(
//       ssb => () => ssb.connFirewall.attempts({old: true, live: false}),
//     );
//     this.firewallAttemptLive$ = this.fromPullStream(ssb =>
//       ssb.connFirewall.attempts({old: false, live: true}),
//     );
//     this.selfPublicRoots$ = this.fromPullStream(ssb =>
//       ssb.threadsUtils.selfPublicRoots({live: true, old: false}),
//     );
//     this.selfPrivateRootIdsLive$ = this.fromPullStream(ssb =>
//       ssb.dbUtils.selfPrivateRootIdsLive(),
//     );
//     this.selfRepliesLive$ = this.fromPullStream(ssb =>
//       ssb.threadsUtils.selfReplies({live: true, old: false}),
//     );
//     this.publishHook$ = this.ssb$
//       .map(ssb => ssb.hooks.publishStream())
//       .flatten();
//     this.migrationProgress$ = this.fromPullStream(ssb =>
//       ssb.syncing.migrating(),
//     );
//     this.indexingProgress$ = this.fromPullStream(ssb => ssb.syncing.indexing());
//     this.acceptInviteResponse$ = xs.create();
//     this.connStarted$ = xs.create();
//     this.consumeAliasResponse$ = xs.create();
//     this.peers$ = this.fromPullStream(ssb => ssb.connUtils.peers()).remember();
//     this.stagedPeers$ = this.fromPullStream(ssb =>
//       ssb.connUtils.stagedPeers(),
//     ).remember();
//     this.bluetoothScanState$ =
//       Platform.OS === 'ios' // TODO: remove this, because the backend checks too
//         ? xs.empty()
//         : this.fromPullStream(ssb => ssb.bluetooth.bluetoothScanState());
//   }
//   fromPullStream(fn) {
//     return this.ssb$.map(fn).map(xsFromPullStream).flatten();
//   }
//   fromCallback(fn) {
//     return this.ssb$.map((0, xsFromCallback)(fn)).flatten();
//   }
//   thread$(rootMsgId, privately) {
//     return this.fromCallback((ssb, cb) =>
//       ssb.threadsUtils.thread({root: rootMsgId, private: privately}, cb),
//     );
//   }
//   threadUpdates$(rootMsgId, privately) {
//     return this.fromPullStream(ssb =>
//       ssb.threadsUtils.threadUpdates({root: rootMsgId, private: privately}),
//     );
//   }
//   rehydrateMessage$(msg) {
//     return this.fromCallback((ssb, cb) =>
//       ssb.threadsUtils.rehydrateLiveExtras(msg, cb),
//     );
//   }
//   profileFeed$(id) {
//     return this.ssb$.map(ssb => opts => ssb.threadsUtils.profileFeed(id, opts));
//   }
//   postsCount$() {
//     return this.fromCallback((ssb, cb) => ssb.dbUtils.postsCount(cb));
//   }
//   liteAboutReadable$(ids) {
//     return this.ssb$.map(ssb => () => {
//       if (!ids || !ids.length) {
//         return null;
//       }
//       return pull(
//         pull.values(ids),
//         pull.asyncMap((id, cb) => {
//           ssb.cachedAboutSelf.get(id, (err, output) => {
//             if (err) {
//               cb(err);
//               return;
//             }
//             const name = output.name;
//             const imageUrl = (0, imageToImageUrl)(output.image);
//             cb(null, {name, imageUrl, id});
//           });
//         }),
//       );
//     });
//   }
//   profileEdges$(start, reverse, positive) {
//     return this.ssb$
//       .map(async ssb => {
//         const [err, out] = await runAsync(ssb.friends.hops)({
//           start,
//           reverse,
//           max: 1,
//         });
//         if (err) {
//           console.error(err);
//           return [];
//         }
//         const hops = out;
//         return Object.keys(hops).filter(feedId =>
//           positive ? hops[feedId] > 0 : hops[feedId] < 0,
//         );
//       })
//       .map(promise => xs.fromPromise(promise))
//       .flatten();
//   }
//   profileImage$(id) {
//     return this.ssb$
//       .map(ssb => (0, xsFromCallback)(ssb.cachedAboutSelf.get)(id))
//       .flatten()
//       .map(output => (0, imageToImageUrl)(output.image));
//   }
//   profileAboutLive$(id) {
//     return this.fromPullStream(ssb => ssb.aboutSelf.stream(id)).map(
//       profile => ({
//         id,
//         name: profile.name,
//         color: colorHash.hex(id),
//         imageUrl: (0, imageToImageUrl)(profile.image),
//         description: profile.description,
//       }),
//     );
//   }
//   isFollowing$(source, dest) {
//     return this.fromCallback((ssb, cb) =>
//       ssb.friends.isFollowing({source, dest, details: true}, cb),
//     );
//   }
//   isBlocking$(source, dest) {
//     return this.fromCallback((ssb, cb) =>
//       ssb.friends.isBlocking({source, dest, details: true}, cb),
//     );
//   }
//   consumeAlias$(uri) {
//     return this.fromCallback((ssb, cb) =>
//       ssb.roomClient.consumeAliasUri(uri, cb),
//     ).map(rpc => rpc.id);
//   }
//   getAliasesLive$(id) {
//     return this.fromPullStream(ssb => ssb.aliasUtils.stream(id));
//   }
//   aliasRegistrationRooms$() {
//     return this.fromCallback((ssb, cb) => ssb.conn.dbPeers(cb)).map(peers =>
//       peers
//         .filter(
//           ([_addr, data]) =>
//             data.type === 'room' &&
//             data.name &&
//             data.supportsAliases &&
//             data.membership,
//         )
//         .map(peer => {
//           const [addr, data] = peer;
//           if (data.key) {
//             return peer;
//           } else {
//             return [
//               addr,
//               Object.assign(Object.assign({}, data), {
//                 key: Ref.getKeyFromAddress(addr),
//               }),
//             ];
//           }
//         }),
//     );
//   }
//   registerAlias$(roomId, alias) {
//     return this.fromCallback((ssb, cb) =>
//       ssb.roomClient.registerAlias(roomId, alias, (err, res) => {
//         if (err) {
//           cb(err);
//           return;
//         }
//         const content = {
//           type: 'room/alias',
//           action: 'registered',
//           alias,
//           room: roomId,
//         };
//         if (res && typeof res === 'string') {
//           content.aliasURL = res;
//         }
//         ssb.publishUtils.publish(content);
//         cb(null, res);
//       }),
//     );
//   }
//   revokeAlias$(roomId, alias) {
//     return this.fromCallback((ssb, cb) =>
//       ssb.roomClient.revokeAlias(roomId, alias, (err, res) => {
//         if (err) {
//           cb(err);
//           return;
//         }
//         const content = {
//           type: 'room/alias',
//           action: 'revoked',
//           alias,
//           room: roomId,
//         };
//         ssb.publishUtils.publish(content);
//         cb(null, res);
//       }),
//     );
//   }
//   addBlobFromPath$(path) {
//     return this.fromCallback((ssb, cb) => ssb.blobsUtils.addFromPath(path, cb));
//   }
//   deleteBlob$(blobId) {
//     return this.fromCallback((ssb, cb) => ssb.blobs.rm(blobId, cb));
//   }
//   restoreIdentity$(inputWords) {
//     return xs.create({
//       start(listener) {
//         this.fn = msg => listener.next(msg);
//         channel.addListener('identity', this.fn);
//         channel.post('identity', `RESTORE: ${inputWords}`);
//       },
//       stop() {
//         channel.removeListener('identity', this.fn);
//       },
//     });
//   }
//   getMentionSuggestions(text, authors) {
//     const opts = {limit: 10};
//     if (text) {
//       opts.text = text;
//     }
//     if (authors.length) {
//       opts.defaultIds = authors;
//     }
//     return this.ssb$
//       .map(ssb =>
//         (0, xsFromCallback)(ssb.suggest.profile)(opts).map(arr =>
//           arr
//             .filter(suggestion => suggestion.id !== ssb.id)
//             .map(suggestion =>
//               Object.assign(Object.assign({}, suggestion), {
//                 imageUrl: (0, imageToImageUrl)(suggestion.image),
//               }),
//             ),
//         ),
//       )
//       .flatten();
//   }
//   searchPublicPosts$(text) {
//     return this.ssb$.map(ssb => () => ssb.threadsUtils.searchPublicPosts(text));
//   }
//   searchPublishHashtagSummaries$(text) {
//     return this.ssb$.map(ssb => () => ssb.threadsUtils.hashtagFeed(text));
//   }
//   produceSignInWebUrl$(serverId) {
//     return this.fromCallback((ssb, cb) =>
//       ssb.httpAuthClient.produceSignInWebUrl(serverId, cb),
//     );
//   }
//   getMnemonic$() {
//     return this.fromCallback((ssb, cb) => ssb.keysUtils.getMnemonic(cb));
//   }
//   readSettings() {
//     return this.fromCallback((ssb, cb) => ssb.settingsUtils.read(cb));
//   }
// }
// exports.SSBSource = SSBSource;
// function contentToPublishReq(content) {
//   return {type: 'publish', content};
// }
// exports.contentToPublishReq = contentToPublishReq;
// async function consumeSink(sink, source, ssbP) {
//   let identityAvailable = false;
//   sink.addListener({
//     next: async req => {
//       if (req.type === 'identity.create' && !identityAvailable) {
//         channel.post('identity', 'CREATE');
//         identityAvailable = true;
//         return;
//       }
//       if (req.type === 'identity.use' && !identityAvailable) {
//         channel.post('identity', 'USE');
//         identityAvailable = true;
//         return;
//       }
//       const ssb = await ssbP;
//       if (req.type === 'publish') {
//         ssb.publishUtils.publish(req.content);
//         return;
//       }
//       if (req.type === 'publishAbout') {
//         ssb.publishUtils.publishAbout(req.content, () => {
//           ssb.cachedAboutSelf.invalidate(ssb.id);
//         });
//         return;
//       }
//       if (req.type === 'invite.accept') {
//         ssb.invite.accept(req.invite, err => {
//           source.acceptInviteResponse$._n(err ? err.message || err : true);
//         });
//         return;
//       }
//       if (req.type === 'conn.start') {
//         const [err1] = await runAsync(ssb.conn.start)();
//         if (err1) {
//           return console.error(err1.message || err1);
//         }
//         const [err3] = await runAsync(ssb.suggest.start)();
//         if (err3) {
//           return console.error(err3.message || err3);
//         }
//         source.connStarted$._n(void 0);
//         // TODO: make a settings plugin in the backend, when it inits it
//         // should call ssb.blobsPurge.start if we loaded the amount from fs
//         return;
//       }
//       if (req.type === 'conn.connect') {
//         const addr = req.address;
//         const data = req.hubData || {};
//         // connect
//         ssb.connUtils.persistentConnect(addr, data, (err, val) => {
//           if (err) {
//             return console.error(err.message || err);
//           }
//           if (!val) {
//             return console.error(`connecting to ${addr} failed`);
//           }
//           // TODO show this error as a Toast
//         });
//         return;
//       }
//       if (req.type === 'conn.rememberConnect') {
//         const addr = req.address;
//         const data = req.data || {};
//         const isRoomInvite = data.type === 'room';
//         // remember
//         const [e1] = await runAsync(ssb.conn.remember)(addr, data);
//         if (e1) {
//           console.error(e1.message || e1);
//           console.error(`conn.remembering ${addr} failed`);
//           if (isRoomInvite) {
//             source.acceptInviteResponse$._n(`connecting to ${addr} failed`);
//           }
//           return;
//         }
//         // connect
//         const [e2] = await runAsync(ssb.connUtils.persistentConnect)(
//           addr,
//           data,
//         );
//         if (e2) {
//           console.error(e2.message || e2);
//           console.error(`connecting to ${addr} failed`);
//           if (isRoomInvite) {
//             source.acceptInviteResponse$._n(`connecting to ${addr} failed`);
//           }
//           return;
//         }
//         if (isRoomInvite) {
//           source.acceptInviteResponse$._n(true);
//         }
//         return;
//       }
//       if (req.type === 'conn.disconnect') {
//         ssb.connUtils.persistentDisconnect(req.address, err => {
//           if (err) {
//             return console.error(err.message || err);
//           }
//         });
//         return;
//       }
//       if (req.type === 'conn.disconnectForget') {
//         const addr = req.address;
//         // forget
//         const [e1] = await runAsync(ssb.conn.forget)(addr);
//         if (e1) {
//           return console.error(e1.message || e1);
//         }
//         // disconnect
//         const [e2] = await runAsync(ssb.connUtils.persistentDisconnect)(addr);
//         if (e2) {
//           return console.error(e2.message || e2);
//         }
//         return;
//       }
//       if (req.type === 'conn.forget') {
//         const addr = req.address;
//         const [e1] = await runAsync(ssb.conn.unstage)(addr);
//         if (e1) {
//           return console.error(e1.message || e1);
//         }
//         const [e2] = await runAsync(ssb.conn.forget)(addr);
//         if (e2) {
//           return console.error(e2.message || e2);
//         }
//         return;
//       }
//       if (req.type === 'bluetooth.search') {
//         if (Platform.OS !== 'ios') {
//           ssb.bluetooth.makeDeviceDiscoverable(req.interval, err => {
//             if (err) {
//               return console.error(err.message || err);
//             }
//           });
//         }
//         return;
//       }
//       if (req.type === 'httpInviteClient.claim') {
//         const res = await runAsync(ssb.httpInviteClient.claim)(req.uri);
//         const [e1, msaddr] = res;
//         if (e1) {
//           source.acceptInviteResponse$._n(`connecting to ${msaddr} failed`);
//           return;
//         }
//         source.acceptInviteResponse$._n(true);
//         const key = Ref.getKeyFromAddress(msaddr);
//         const [e2] = await runAsync(ssb.conn.remember)(msaddr, {
//           key,
//           // TODO: these should be put in ssb-room-client when
//           // the room answers `room.metadata` or `tunnel.isRoom`:
//           // type: 'room',
//           // supportsHttpAuth: true,
//           // supportsAliases: true,
//         });
//         if (e2) {
//           console.error(e2.message || e2);
//           console.error(`conn.remembering ${msaddr} failed`);
//           return;
//         }
//         return;
//       }
//       if (req.type === 'roomClient.consumeAliasUri') {
//         ssb.roomClient.consumeAliasUri(req.uri, (err, rpc) => {
//           if (err) {
//             console.error('error to consume alias');
//             console.error(err);
//             source.consumeAliasResponse$._n(false);
//           } else {
//             source.consumeAliasResponse$._n(rpc.id);
//           }
//         });
//         return;
//       }
//       if (req.type === 'httpAuthClient.signIn') {
//         // sign-in
//         const [e1] = await runAsync(ssb.httpAuthClient.consumeSignInSsbUri)(
//           req.uri,
//         );
//         if (e1) {
//           console.error('error to sign-in');
//           console.error(e1.message || e1);
//           return;
//         }
//         const u = new URLPolyfill(req.uri);
//         const addr = u.searchParams.get('multiserverAddress');
//         // remember
//         const data = {type: 'room'};
//         const [e2] = await runAsync(ssb.conn.remember)(addr, data);
//         if (e2) {
//           console.error(`conn.remembering ${addr} failed`);
//           console.error(e2.message || e2);
//           return;
//         }
//         // connect
//         const [e3] = await runAsync(ssb.connUtils.persistentConnect)(
//           addr,
//           data,
//         );
//         if (e3) {
//           console.error(`connecting to ${addr} failed`);
//           console.error(e3.message || e3);
//           return;
//         }
//       }
//       if (req.type === 'settings.hops') {
//         ssb.settingsUtils.updateHops(req.hops, err => {
//           if (err) {
//             return console.error(err.message || err);
//           }
//         });
//         return;
//       }
//       if (req.type === 'settings.blobsPurge') {
//         ssb.settingsUtils.updateBlobsPurge(req.storageLimit, err => {
//           if (err) {
//             return console.error(err.message || err);
//           }
//         });
//         return;
//       }
//       if (req.type === 'settings.showFollows') {
//         ssb.threadsUtils.updateShowFollows(req.showFollows);
//         ssb.settingsUtils.updateShowFollows(req.showFollows, err => {
//           if (err) {
//             return console.error(err.message || err);
//           }
//         });
//         return;
//       }
//       if (req.type === 'settings.detailedLogs') {
//         ssb.settingsUtils.updateDetailedLogs(req.detailedLogs, err => {
//           if (err) {
//             return console.error(err.message || err);
//           }
//         });
//         return;
//       }
//     },
//   });
// }
//
// function waitForIdentity() {
//   return new Promise(resolve => {
//     channel.addListener('identity', msg => {
//       if (msg === 'IDENTITY_READY') {
//         resolve(true);
//       }
//     });
//   });
// }
//
// export function ssbDriver(sink) {
//   const ssbP = waitForIdentity().then(makeClient);
//   const source = new SSBSource(ssbP);
//   consumeSink(sink, source, ssbP);
//   return source;
// }
