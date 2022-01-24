"use strict";
// SPDX-FileCopyrightText: 2021 The Manyverse Authors
//
// SPDX-License-Identifier: MPL-2.0
const pull = require('pull-stream');
const pullAsync = require('pull-async');
const cat = require('pull-cat');
module.exports = {
    name: 'aboutSelf',
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
        function get(feedId, cb) {
            // TODO: this is a workaround for https://github.com/ssb-ngi-pointer/ssb-db2/issues/235
            // When that issue is resolved, we should remove this boolean
            let done = false;
            ssb.db.onDrain('aboutSelf', () => {
                if (!done) {
                    done = true;
                    cb(null, ssb.db.getIndex('aboutSelf').getProfile(feedId));
                }
            });
        }
        function stream(feedId) {
            return cat([
                // First deliver latest field value
                pull(pullAsync((cb) => {
                    get(feedId, cb);
                }), pull.filter((out) => out.name || out.image || out.description)),
                // Then deliver live field values
                ssb.db.getIndex('aboutSelf').getLiveProfile(feedId),
            ]);
        }
        return {
            get,
            stream,
        };
    },
};
//# sourceMappingURL=aboutSelf.js.map