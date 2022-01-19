npm i --save react-native-crypto
# install peer deps
npm i --save react-native-randombytes
react-native link react-native-randombytes
# install latest rn-nodeify
npm i --save-dev rn-nodeify@latest
# install node core shims and recursively hack package.json files
# in ./node_modules to add/update the "browser"/"react-native" field with relevant mappings
./node_modules/.bin/rn-nodeify --hack --install


// index.ios.js or index.android.js
// make sure you use `import` and not `require`!
import './shim.js'
// ...the rest of your code
import crypto from 'crypto'
// use crypto
console.log(crypto.randomBytes(32).toString('hex'))