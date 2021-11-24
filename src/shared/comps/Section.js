import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {connect} from 'react-redux/lib/exports';
import SchemaStyles from '../SchemaStyles';

/**
 * Created on 05 Nov 2021 by lonmee
 */
const Section = ({children, title}) => {
  const {FG, text} = SchemaStyles();
  const {titleContainer, ti} = styles;
  return (
    <View style={[FG]}>
      <View style={[titleContainer]}>
        <Text style={[text, ti]}>{title}</Text>
      </View>
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  titleContainer: {
    marginLeft: 15,
    marginVertical: 18,
  },
  ti: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const msp = s => s.cfg;
export default connect(msp)(Section);
