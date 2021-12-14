import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import React, {useEffect} from 'react';
import App from './src/App';
import {persistor, store} from './src/store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import nodejs from 'nodejs-mobile-react-native';
import {makeClient} from './src/remote/ssb/Client';

const WrappedApp = () => {
  useEffect(() => {
    nodejs.start('loader.js');
    nodejs.channel.addListener('identity', msg => {
      msg === 'IDENTITY_READY' && makeClient();
    });
    nodejs.channel.addListener('exception', msg => {
      console.error('node:', msg);
    });
    // ask to start ssb
    nodejs.channel.post('identity', 'CREATE');
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => WrappedApp);
