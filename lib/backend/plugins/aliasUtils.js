"use strict";
// SPDX-FileCopyrightText: 2021 The Manyverse Authors
//
// SPDX-License-Identifier: MPL-2.0
const pull = require('pull-stream');
const pullAsync = require('pull-async');
const cat = require('pull-cat');
const Ref = require('ssb-ref');
const { where, and, author, type, live, toPullStream, } = require('ssb-db2/operators');
function makeID(room, alias) {
    return `${room}~${alias}`;
}
module.exports = {
    name: 'aliasUtils',
    version: '1.0.0',
    manifest: {
        get: 'async',
        stream: 'source',
    },
    permissions: {
        master: {
            allow: ['get', 'stream'],
        },
    },
    init: function init(ssb) {
        function getMap(feedId, cb) {
            return pull(ssb.db.query(where(and(author(feedId, { dedicated: feedId === ssb.id }), type('room/alias'))), toPullStream()), pull.collect((err, msgs) => {
                var _a, _b;
                if (err) {
                    cb(err);
                    return;
                }
                const map = new Map();
                for (const msg of msgs) {
                    if (!((_a = msg.value) === null || _a === void 0 ? void 0 : _a.content))
                        continue;
                    const { action, alias, aliasURL, room } = (_b = msg.value) === null || _b === void 0 ? void 0 : _b.content;
                    if (!room)
                        continue;
                    if (!Ref.isFeed(room))
                        continue;
                    if (!alias)
                        continue;
                    if (action !== 'registered' && action !== 'revoked')
                        continue;
                    if (action === 'registered') {
                        if (!aliasURL)
                            continue;
                        map.set(makeID(room, alias), { alias, aliasURL, room });
                    }
                    else {
                        map.delete(makeID(room, alias));
                    }
                }
                cb(null, map);
            }));
        }
        function get(feedId, cb) {
            getMap(feedId, (err, map) => {
                if (err)
                    cb(err);
                else
                    cb(null, [...map.values()]);
            });
        }
        function stream(feedId) {
            let map;
            return cat([
                // First deliver latest information on past alias msgs
                pullAsync((cb) => {
                    getMap(feedId, (err, m) => {
                        if (err)
                            cb(err);
                        else {
                            map = m;
                            cb(null, [...map.values()]);
                        }
                    });
                }),
                // Then update the array as live msgs appear
                pull(ssb.db.query(where(and(author(feedId, { dedicated: feedId === ssb.id }), type('room/alias'))), live({ old: false }), toPullStream()), pull.filter((msg) => {
                    var _a, _b;
                    if (!((_a = msg.value) === null || _a === void 0 ? void 0 : _a.content))
                        return false;
                    const { action, alias, aliasURL, room } = (_b = msg.value) === null || _b === void 0 ? void 0 : _b.content;
                    if (!room)
                        return false;
                    if (!Ref.isFeed(room))
                        return false;
                    if (!alias)
                        return false;
                    if (action !== 'registered' && action !== 'revoked')
                        return false;
                    if (action === 'registered' && !aliasURL)
                        return false;
                    return true;
                }), pull.map((msg) => {
                    var _a;
                    const { alias, aliasURL, room, action } = (_a = msg.value) === null || _a === void 0 ? void 0 : _a.content;
                    if (action === 'registered') {
                        map.set(makeID(room, alias), { alias, aliasURL, room });
                    }
                    else {
                        map.delete(makeID(room, alias));
                    }
                    return [...map.values()];
                })),
            ]);
        }
        return {
            get,
            stream,
        };
    },
};
//# sourceMappingURL=aliasUtils.js.map