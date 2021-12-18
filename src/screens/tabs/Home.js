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

const Home = ({navigation, selfFeedId, followers, setSource}) => {
  const {barStyle, FG, flex1, marginTop10} = SchemaStyles();
  const [opLog, setOpLog] = useState('');

  useEffect(() => {
    setSource((window.ss = ssbDriver(xs.create())));
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
          <Button title={'conn.start'} onPress={() => null} />
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
    setDarkMode: darkMode => d({type: 'setDarkMode', payload: darkMode}),
    setSource: source => d({type: 'setSource', payload: source}),
  };
};

export default connect(msp, mdp)(Home);
