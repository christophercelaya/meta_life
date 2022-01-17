import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import React from 'react';
import App from './src/App';
import {persistor, store} from './src/store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import SecureKeychain from './src/remote/wallet/core/SecureKeychain';
import EntryScriptWeb3 from './src/remote/wallet/core/EntryScriptWeb3';

// setTimeout(() => {
//     nodejs.start('loader.js');
// }, 1);

setTimeout(() => {
  SecureKeychain.init(null);
  // Init EntryScriptWeb3 asynchronously on the background
  EntryScriptWeb3.init();
  // SplashScreen.hide();
}, 2);

// setTimeout(() => {
//   nodejs.start('loader.js');
// }, 1);

setTimeout(() => {
  // todo: web3
}, 2);

const WrappedApp = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => WrappedApp);
