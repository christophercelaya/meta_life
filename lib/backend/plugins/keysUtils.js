"use strict";
// SPDX-FileCopyrightText: 2018-2019 The Manyverse Authors
//
// SPDX-License-Identifier: MPL-2.0
const Mnemonic = require('ssb-keys-mnemonic');
module.exports = {
    name: 'keysUtils',
    version: '1.0.0',
    manifest: {
        getMnemonic: 'sync',
    },
    permissions: {
        master: {
            allow: ['getMnemonic'],
        },
    },
    init: function init(ssb, _config) {
        return {
            getMnemonic() {
                return Mnemonic.keysToWords(ssb.keys);
            },
        };
    },
};
//# sourceMappingURL=keysUtils.js.map