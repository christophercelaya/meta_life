import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import SchemaStyles, {
  colorsBasics,
  colorsSchema,
} from '../../shared/SchemaStyles';
import {connect} from 'react-redux/lib/exports';
import nodejs from 'nodejs-mobile-react-native';
import {makeClient} from '../../remote/ssb/Client';
import {connectedPeersStream} from '../../remote/ssbOP';

const Home = ({
  navigation,
  instance,
  status,
  selfFeedId,
  followers,
  setInstance,
}) => {
  const {start, channel} = nodejs;
  const {barStyle, FG, flex1, marginTop10} = SchemaStyles();
  const [nodeLog, setNodeLog] = useState('');
  const [ssb, setSsb] = useState();

  useEffect(() => {
    start('loader.js');
    let identityListener, logListener, exceptionListener;
    identityListener = channel.addListener('identity', msg => {
      msg === 'IDENTITY_READY' &&
        makeClient()
          .then(ssb => {
            setSsb(ssb);
            setInstance(ssb);
          })
          .catch(console.error);
    });
    logListener = channel.addListener('nodeLog', log =>
      setNodeLog(nodeLog + '\n' + log),
    );
    exceptionListener = channel.addListener('exception', log =>
      setNodeLog(nodeLog + '\n' + 'exception!!!:' + log),
    );
    // ask to start ssb & adjust for hmr of RN
    !ssb ? channel.post('identity', 'CREATE') : setInstance(ssb);
    return () => {
      identityListener.remove();
      logListener.remove();
      exceptionListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={[flex1]}>
      <StatusBar barStyle={barStyle} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={marginTop10}>
        <View style={FG}>
          <Button
            title={'SubScreen'}
            onPress={() => navigation.navigate('SubScreen')}
          />
          <Button
            title={status.closed ? 'closed' : 'running'}
            onPress={() =>
              status.closed ? instance.conn.start() : instance.conn.stop()
            }
          />
          <Button
            title={'peers'}
            onPress={() => connectedPeersStream(instance)}
          />
        </View>
        <Text style={{color: colorsSchema.primary}}>id: {selfFeedId}</Text>
        <Text style={{color: colorsBasics.lighter}}>
          followers: {followers}
        </Text>
        <Text style={{color: colorsBasics.light}}>{nodeLog}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const msp = s => s.ssb;

const mdp = d => {
  return {
    setDarkMode: darkMode => d({type: 'setDarkMode', payload: darkMode}),
    setInstance: ssb => d({type: 'setInstance', payload: ssb}),
    setFeedId: ({id}) => d({type: 'setFeedId', payload: id}),
  };
};

export default connect(msp, mdp)(Home);
