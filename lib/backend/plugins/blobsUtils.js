"use strict";
// SPDX-FileCopyrightText: 2018-2020 The Manyverse Authors
//
// SPDX-License-Identifier: MPL-2.0
const pull = require('pull-stream');
const Read = require('pull-file');
module.exports = {
    name: 'blobsUtils',
    version: '1.0.0',
    manifest: {
        addFromPath: 'async',
    },
    permissions: {
        master: {
            allow: ['addFromPath'],
        },
    },
    init: function init(ssb) {
        var _a;
        if (!((_a = ssb.blobs) === null || _a === void 0 ? void 0 : _a.add)) {
            throw new Error('"blobsUtils" is missing required plugin "ssb-blobs"');
        }
        return {
            addFromPath(path, cb) {
                pull(Read(path, {}), ssb.blobs.add(cb));
            },
        };
    },
};
//# sourceMappingURL=blobsUtils.js.map