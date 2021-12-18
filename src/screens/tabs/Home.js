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
import nodejs from 'nodejs-mobile-react-native';
import {makeClient} from '../../remote/ssb/Client';
import {
  connectedPeersStream,
  connectPeer,
  connStart,
  ping,
} from '../../remote/ssbOP';
import {connect} from 'react-redux';

const Home = ({navigation, selfFeedId, followers, setInstance}) => {
  const {barStyle, FG, flex1, marginTop10} = SchemaStyles();
  const [ssb, setSsb] = useState(null);
  const [opLog, setOpLog] = useState('');

  useEffect(() => {
    const {channel} = nodejs;
    let identityListener, logListener, exceptionListener;
    identityListener = channel.addListener('identity', msg => {
      msg === 'IDENTITY_READY' &&
        makeClient()
          .then(ssb => {
            setSsb(ssb);
            setInstance((window.ssb = ssb));
          })
          .catch(console.error);
    });
    logListener = channel.addListener('nodeLog', log =>
      setOpLog(opLog + '\n' + log),
    );
    exceptionListener = channel.addListener('exception', log =>
      setOpLog(opLog + '\n' + 'exception!!!:' + log),
    );
    // ask to start ssb & adjust for hmr of RN
    !ssb ? channel.post('identity', 'CREATE') : setInstance((window.ssb = ssb));

    return () => {
      identityListener.remove();
      logListener.remove();
      exceptionListener.remove();
    };
  });

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
          <Button title={'conn.start'} onPress={() => connStart(ssb)} />
          <Button
            title={'getPeers'}
            onPress={() => connectedPeersStream(ssb)}
          />
          <Button
            title={'connect'}
            onPress={() =>
              connectPeer({
                ssb,
                addr: 'net:169.254.151.116:54881~shs:8STJ45rua0rjvUR48OFGzYFwFJWfiNuRwQoC4hnQJbQ=',
                data: {},
              })
            }
          />
          <Button title={'ping'} onPress={() => ping(ssb)} />
        </View>
        <Text style={{color: colorsSchema.primary}}>id: {selfFeedId}</Text>
        <Text style={{color: colorsBasics.lighter}}>
          followers: {followers}
        </Text>
        <Text style={{color: colorsBasics.light}}>{opLog}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const msp = s => s.ssb;

const mdp = d => {
  return {
    setDarkMode: darkMode => d({type: 'setDarkMode', payload: darkMode}),
    setInstance: instance => d({type: 'setInstance', payload: instance}),
  };
};

export default connect(msp, mdp)(Home);
