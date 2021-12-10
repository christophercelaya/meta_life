import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import SchemaStyles from '../../shared/SchemaStyles';
import {connect} from 'react-redux/lib/exports';
import nodejs from 'nodejs-mobile-react-native';

const Home = ({navigation}) => {
  const {barStyle, FG, flex1, marginTop10} = SchemaStyles();

  const [nodeLog, setNodeLog] = useState('');

  useEffect(() => {
    nodejs.channel.addListener('message', log =>
      setNodeLog(nodeLog + '\n' + log),
    );
    return () => {
      // console.log('componentDidUpdate');
    };
  }, [nodeLog]);

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
            onPress={() => nodejs.channel.post('identity', 'CREATE')}
          />
        </View>
        <Text style={{color: 'white'}}>{nodeLog}</Text>
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
