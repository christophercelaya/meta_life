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
import {
  addPrivateUpdatesListener,
  addPublicUpdatesListener,
  loadMsg,
  reqStartSSB,
} from '../../remote/ssbOP';

const Home = ({navigation, feedId, setFeedId, addPublicMsg, setPrivateMsg}) => {
  const {barStyle, FG, flex1} = SchemaStyles();
  const [opLog, setOpLog] = useState('');
  useEffect(() => {
    let opLogCache: '';
    reqStartSSB(ssb => {
      window.ssb = ssb;
      ssb.whoami((e, v) => setFeedId(v.id));
      ssb.conn.start((e, v) => {
        e
          ? setOpLog(opLog + 'ssb server connect error: ' + e)
          : setOpLog(
              (opLogCache =
                opLog +
                'ssb server connected with:  ' +
                JSON.stringify(v) +
                '\n'),
            );
        // ssb.conn.stage((e, v) => console.log(v ? 'staging' : 'staged'));
      });
      // listening for public & private msg
      addPublicUpdatesListener(ssb, key =>
        loadMsg(ssb, key, false, addPublicMsg),
      );
      addPrivateUpdatesListener(ssb, key =>
        loadMsg(ssb, key, true, setPrivateMsg),
      );
      // getMnemonic
      ssb.keysUtils.getMnemonic((e, v) => setOpLog(opLogCache + v + '\n'));
    });
  }, []);

  return (
    <SafeAreaView style={[flex1]}>
      <StatusBar barStyle={barStyle} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={FG}>
          <Button
            title={'SubScreen'}
            onPress={() => navigation.navigate('SubScreen')}
          />
        </View>
        <Text style={{color: colorsSchema.primary}}>id: {feedId}</Text>
        <Text selectable={true} style={{color: colorsBasics.light}}>
          {opLog}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const msp = s => {
  return {
    feedId: s.user.feedId,
  };
};

const mdp = d => {
  return {
    setFeedId: v => d({type: 'setFeedId', payload: v}),
    setPublicMsg: v => d({type: 'setPublicMsg', payload: v}),
    addPublicMsg: v => d({type: 'addPublicMsg', payload: v}),
    setPrivateMsg: v => d({type: 'setPrivateMsg', payload: v}),
    addPrivateMsg: v => d({type: 'addPrivateMsg', payload: v}),
  };
};

export default connect(msp, mdp)(Home);
