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
import {ssbDriver} from '../../remote/ssbOPSource';
import xs from 'xstream';
import nodejs from 'nodejs-mobile-react-native';
import {connStart} from '../../remote/ssbOP';

const Home = ({navigation, selfFeedId, followers, setSource}) => {
  const {barStyle, FG, flex1, marginTop10} = SchemaStyles();
  const [opLog, setOpLog] = useState('');

  useEffect(() => {
    setSource((window.ss = ssbDriver((window.xs = xs.create()))));
    nodejs.channel.post('identity', 'CREATE');
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
          <Button title={'conn.start'} onPress={() => connStart(window.ssb)} />
          <Button title={'peers'} onPress={() => null} />
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
    setSource: source => d({type: 'setSource', payload: source}),
  };
};

export default connect(msp, mdp)(Home);
