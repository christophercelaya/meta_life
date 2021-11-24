import React, {useEffect} from 'react';
import {Button, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import SchemaStyles from '../../shared/SchemaStyles';
import {connect} from 'react-redux/lib/exports';
import nodejs from 'nodejs-mobile-react-native';

const Home = ({navigation}) => {
  const {barStyle, FG, flex1, marginTop10} = SchemaStyles();

  useEffect(() => {
    // console.log('subscribe');
    return () => {
      // console.log('componentDidUpdate');
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
            title={'node info'}
            onPress={() => nodejs.channel.send('nodeInfo')}
          />
          <Button
            title={'start SSB'}
            onPress={() => nodejs.channel.send('startSsb')}
          />
        </View>
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

export default connect(msp, mdp)(Home);
