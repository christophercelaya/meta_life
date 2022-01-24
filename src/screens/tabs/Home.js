import React, {useEffect} from 'react';
import {Button, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import SchemaStyles from '../../shared/SchemaStyles';
import {connect} from 'react-redux/lib/exports';
import WebView from 'react-native-webview';

const Home = ({navigation}) => {
  const {barStyle, FG, flex1, marginTop10} = SchemaStyles();

  useEffect(() => {
    // console.log('subscribe');
    return () => {
      // console.log('componentDidUpdate');
    };
  }, []);

  return (
    <View style={[FG, flex1]}>
      <WebView
        containerStyle={{width: 200, height: 400}}
        scalesPageToFit={false}
        source={{uri: 'https://demo.readyplayer.me/avatar'}}
        onMessage={event => {
          alert(
            `Avatar 3D model can be downloaded from: ${event.nativeEvent.data}`,
          );
        }}
      />
      <Button
        title={'SubScreen'}
        onPress={() => navigation.navigate('SubScreen')}
      />
    </View>
  );
};

const msp = s => s.cfg;

const mdp = d => {
  return {
    setDarkMode: darkMode => d({type: 'setDarkMode', payload: darkMode}),
  };
};

export default connect(msp, mdp)(Home);
