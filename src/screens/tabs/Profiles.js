import React, {useEffect} from 'react';
import {Button, ScrollView, Switch, View} from 'react-native';
import SchemaStyles from '../../shared/SchemaStyles';
import {connect} from 'react-redux/lib/exports';
import ControllerItem from '../../shared/comps/ControllerItem';
import I18n from '../../i18n/I18n';
import Card from './profiles/Card';

const Profiles = ({navigation, darkMode, setDarkMode, lang, setLang}) => {
  const {barStyle, FG, flex1, marginTop10, alignItemsCenter} = SchemaStyles();
  useEffect(() => {
    // console.log('subscribe');
    return () => {
      // console.log('componentDidUpdate');
    };
  }, []);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={marginTop10}>
      <View style={FG} />
    </ScrollView>
  );
};

const msp = s => s.cfg;

const mdp = d => {
  return {
    setDarkMode: darkMode => d({type: 'setDarkMode', payload: darkMode}),
    setLang: lang => {
      d({type: 'setLang', payload: lang});
      I18n.locale = lang;
    },
  };
};

export default connect(msp, mdp)(Profiles);
