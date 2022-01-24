"use strict";
// SPDX-FileCopyrightText: 2018-2020 The Manyverse Authors
//
// SPDX-License-Identifier: MPL-2.0
const ssbKeys = require('ssb-keys');
const Ref = require('ssb-ref');
module.exports = {
    name: 'publishUtilsBack',
    version: '1.0.0',
    manifest: {
        publish: 'async',
        publishAbout: 'async',
    },
    permissions: {
        master: {
            allow: ['publish', 'publishAbout'],
        },
    },
    init: function init(ssb) {
        var _a, _b;
        if (!((_a = ssb.blobs) === null || _a === void 0 ? void 0 : _a.push)) {
            throw new Error('"publishUtilsBack" is missing required plugin "ssb-blobs"');
        }
        if (!((_b = ssb.blobsUtils) === null || _b === void 0 ? void 0 : _b.addFromPath)) {
            throw new Error('"publishUtilsBack" is missing required plugin "blobsUtils"');
        }
        return {
            publish(content, cb) {
                if (content.mentions) {
                    for (const mention of content.mentions) {
                        if (Ref.isBlob(mention.link)) {
                            ssb.blobs.push(mention.link, (err) => {
                                if (err)
                                    console.error(err);
                            });
                        }
                    }
                }
                if (content.recps) {
                    try {
                        content = ssbKeys.box(content, content.recps
                            .map((e) => Ref.isFeed(e) ? e : Ref.isFeed(e.link) ? e.link : void 0)
                            .filter((x) => !!x));
                    }
                    catch (e) {
                        return cb(e);
                    }
                }
                ssb.publish(content, (err, msg) => {
                    if (err)
                        console.error(err);
                    if (cb)
                        cb(err, msg);
                });
            },
            publishAbout(content, cb) {
                if (content.image && !Ref.isBlobId(content.image[0])) {
                    ssb.blobsUtils.addFromPath(content.image, (err, hash) => {
                        if (err)
                            return console.error(err);
                        content.image = hash;
                        ssb.publish(content, (err2, msg) => {
                            if (err2)
                                console.error(err2);
                            if (cb)
                                cb(err2, msg);
                        });
                    });
                }
                else {
                    ssb.publish(content, (err, msg) => {
                        if (err)
                            console.error(err);
                        if (cb)
                            cb(err, msg);
                    });
                }
            },
        };
    },
};
//# sourceMappingURL=publishUtilsBack.js.map