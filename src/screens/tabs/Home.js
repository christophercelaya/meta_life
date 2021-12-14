import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import SchemaStyles, {colorsSchema} from '../../shared/SchemaStyles';
import {connect} from 'react-redux/lib/exports';
import nodejs from 'nodejs-mobile-react-native';

const Home = ({navigation, id}) => {
  const {barStyle, FG, flex1, marginTop10} = SchemaStyles();
  const [nodeLog, setNodeLog] = useState('');

  useEffect(() => {
    nodejs.channel.addListener('nodeLog', log =>
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
        </View>
        <Text style={{color: colorsSchema.primary}}>id: {id}</Text>
        <Text style={{color: 'white'}}>{nodeLog}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const msp = s => s.ssb;

const mdp = d => {
  return {
    setDarkMode: darkMode => d({type: 'setDarkMode', payload: darkMode}),
  };
};

export default connect(msp, mdp)(Home);
