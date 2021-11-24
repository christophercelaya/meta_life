import React, {useEffect} from 'react';
import {Button, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {connect} from 'react-redux/lib/exports';
import SchemaStyles from '../shared/SchemaStyles';

const SubScreen = ({navigation, darkMode, setDarkMode}) => {
  const {barStyle, FG, flex1} = SchemaStyles();
  useEffect(() => {
    // console.log('subscribe');
    return () => {
      // console.log('componentDidUpdate');
    };
  }, []);

  return (
    <SafeAreaView style={[flex1]}>
      <StatusBar barStyle={barStyle} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={FG} />
      </ScrollView>
    </SafeAreaView>
  );
};

const msp = s => s.cfg;

const mdp = d => {
  return {
    setDarkMode: darkMode => d({type: 'setDarkMode', payload: darkMode}),
  };
};

export default connect(msp, mdp)(SubScreen);
