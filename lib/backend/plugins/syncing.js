"use strict";
// SPDX-FileCopyrightText: 2018-2021 The Manyverse Authors
//
// SPDX-License-Identifier: MPL-2.0
const fromEvent = require('pull-stream-util/from-event');
module.exports = {
    name: 'syncing',
    version: '1.0.0',
    manifest: {
        migrating: 'source',
        indexing: 'source',
    },
    permissions: {
        master: {
            allow: ['migrating', 'indexing'],
        },
    },
    init: function init(ssb) {
        return {
            migrating() {
                return fromEvent('ssb:db2:migrate:progress', ssb);
            },
            indexing() {
                return fromEvent('ssb:db2:indexing:progress', ssb);
            },
        };
    },
};
//# sourceMappingURL=syncing.js.map