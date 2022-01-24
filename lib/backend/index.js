// SPDX-FileCopyrightText: 2018-2021 The Manyverse Authors
//
// SPDX-License-Identifier: MPL-2.0
let channel;
// Setup Channel
if (process.env.MANYVERSE_PLATFORM === 'mobile') {
    const rnBridge = require('rn-bridge');
    channel = {
        addListener(type, fn) {
            rnBridge.channel.on(type, fn);
        },
        post(type, msg) {
            rnBridge.channel.post(type, msg);
        },
    };
}
else {
    const { ipcMain } = require('electron');
    const webContentsPromise = process.webContentsP;
    let webContents = null;
    channel = {
        addListener(type, fn) {
            ipcMain.addListener(type, (first, second) => {
                const msg = second !== null && second !== void 0 ? second : first;
                fn(msg);
            });
        },
        post(type, msg) {
            if (webContents) {
                webContents.send(type, msg);
            }
            else {
                webContentsPromise.then((wc) => {
                    webContents = wc;
                    webContents.send(type, msg);
                });
            }
        },
    };
}
// Setup initial communication with the frontend, to create or restore identity
channel.addListener('identity', (request) => {
    const startSSB = () => require('./ssb');
    let response;
    if (request === 'CREATE' || request === 'USE') {
        startSSB();
        response = 'IDENTITY_READY';
    }
    else if (request.startsWith('RESTORE:')) {
        const words = request.split('RESTORE: ')[1].trim();
        const restore = require('./restore');
        response = restore(words);
        if (response === 'IDENTITY_READY')
            startSSB();
    }
    channel.post('identity', response);
});
//# sourceMappingURL=index.js.map