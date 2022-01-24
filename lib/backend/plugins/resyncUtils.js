"use strict";
// SPDX-FileCopyrightText: 2021 The Manyverse Authors
//
// SPDX-License-Identifier: MPL-2.0
module.exports = {
    name: 'resyncUtils',
    version: '1.0.0',
    manifest: {},
    permissions: {
        master: {
            allow: [],
        },
    },
    init(ssb, config) {
        // Disable conn firewall to allow "strangers" to connect and resync data
        ssb.getVectorClock((err, clock) => {
            if (err)
                return console.error('resyncUtils exception', err);
            if (!clock)
                return console.error('resyncUtils missing clock', clock);
            if (clock[ssb.id])
                return; // we are not resyncing, apparently
            // Our feed is empty, so temporarily disable firewall for strangers
            ssb.connFirewall.reconfigure({ rejectUnknown: false });
            // Re-enable firewall when our first msg is detected
            let unsubscribeDB = ssb.post((msg) => {
                var _a, _b, _c;
                if (msg.value.author === ssb.id) {
                    ssb.connFirewall.reconfigure({
                        rejectUnknown: (_c = (_b = (_a = config.conn) === null || _a === void 0 ? void 0 : _a.firewall) === null || _b === void 0 ? void 0 : _b.rejectUnknown) !== null && _c !== void 0 ? _c : true,
                    });
                    unsubscribeDB === null || unsubscribeDB === void 0 ? void 0 : unsubscribeDB();
                    unsubscribeDB = null;
                }
            }, false);
        });
    },
};
//# sourceMappingURL=resyncUtils.js.map