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
import {client} from '../../remote/ssb/Client';

const Home = ({navigation, selfFeedId, followers, setFeedId}) => {
  const {barStyle, FG, flex1, marginTop10} = SchemaStyles();
  const [nodeLog, setNodeLog] = useState('');

  useEffect(() => {
    nodejs.channel.addListener('nodeLog', log =>
      setNodeLog(nodeLog + '\n' + log),
    );
    nodejs.channel.addListener('exception', log =>
      setNodeLog(nodeLog + '\n' + 'exception!!!:' + log),
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
            title={'who am i'}
            onPress={() => client.instance.whoami().then(setFeedId)}
          />
          <Button
            title={'peers'}
            onPress={() =>
              client.instance.connUtils.peers((e, r) => console.log(r))
            }
          />
        </View>
        <Text style={{color: colorsSchema.primary}}>id: {selfFeedId}</Text>
        <Text style={{color: colorsBasics.lighter}}>
          followers: {followers}
        </Text>
        <Text style={{color: 'white'}}>{nodeLog}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const msp = s => s.ssb;

const mdp = d => {
  return {
    setDarkMode: darkMode => d({type: 'setDarkMode', payload: darkMode}),
    setFeedId: ({id}) => d({type: 'setFeedId', payload: id}),
  };
};

export default connect(msp, mdp)(Home);
