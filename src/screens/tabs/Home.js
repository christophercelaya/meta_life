import React, {useEffect} from 'react';
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
import * as ssbOP from '../../remote/ssbOP';
import {
  addPrivateUpdatesListener,
  addPublicUpdatesListener,
  loadMsg,
  reqStartSSB,
} from '../../remote/ssbOP';

const Home = ({
  navigation,
  feedId,
  setFeedId,
  addPublicMsg,
  addPrivateMsg,
  setPrivateMsg,
}) => {
  const {barStyle, FG, flex1} = SchemaStyles();
  useEffect(() => {
    window.ssb
      ? (ssbOP.ssb = window.ssb)
      : reqStartSSB(ssb => {
          window.ssb = ssb;
          // set feedId
          setFeedId(ssb.id);
          // start & stage self
          ssb.starter.startAndStage((e, v) =>
            console.log(v ? 'start' : 'started yet'),
          );
          // listening for public & private msg
          addPublicUpdatesListener(key => loadMsg(key, false, addPublicMsg));
          // addPrivateUpdatesListener(key => loadMsg(key, true, addPrivateMsg));
          addPrivateUpdatesListener(key => loadMsg(key, true, setPrivateMsg));
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
          {'log holder'}
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
