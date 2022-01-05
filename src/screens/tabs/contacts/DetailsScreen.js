import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import SchemaStyles from '../../../shared/SchemaStyles';

const DetailsScreen = ({ssb, feedId}) => {
  console.log(ssb, feedId);
  const {barStyle, FG, flex1} = SchemaStyles();
  useEffect(() => {
    console.log('enter screen');
    return () => console.log('exit screen');
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

export default DetailsScreen;
