/**
 * Created on 15 Jan 2022 by lonmee
 */

// ====
// Http
// ====

const options = {
    keepAlive: true,
    withCredentials: false,
    timeout: 20000, // ms
    headers: [
        {
            name: 'Access-Control-Allow-Origin',
            value: '*'
        },
        {
        }
    ],
    agent: {
        http: http.Agent(),
        baseUrl: ''
    }
};

const provider = new Web3HttpProvider('http://localhost:8545', options);

// ==========
// Websockets
// ==========

const Web3WsProvider = require('web3-providers-ws');

const options = {
    timeout: 30000, // ms

    // Useful for credentialed urls, e.g: ws://username:password@localhost:8546
    headers: {
        authorization: 'Basic username:password'
    },

    clientConfig: {
        // Useful if requests are large
        maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
        maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

        // Useful to keep a connection alive
        keepalive: true,
        keepaliveInterval: 60000 // ms
    },

    // Enable auto reconnection
    reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 5,
        onTimeout: false
    }
};

const ws = new Web3WsProvider('ws://localhost:8546', options);