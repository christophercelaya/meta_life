/**
 * Created on 18 Jan 2022 by lonmee
 */

import React from 'react';
import {connect} from 'react-redux/lib/exports';
import I18n from '../../../i18n/I18n';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SchemaStyles from '../../../shared/SchemaStyles';

const iconDic = {
  BG: require('../../../assets/image/profiles/wallet_backgroud.png'),
  Sach: require('../../../assets/image/profiles/Profiles_Walltes_Sach.png'),
  Transfer: require('../../../assets/image/profiles/Profiles_Walltes_Transfer.png'),
  Receivr: require('../../../assets/image/profiles/Profiles_Walltes_receivr.png'),
  Managent: require('../../../assets/image/profiles/Profiles_icon_managent.png'),
};

const Card = ({style, navigation, balance = 0}) => {
  const {row, flex1, justifySpaceBetween} = SchemaStyles(),
    {
      container,
      balanceContainer,
      valueContainer,
      iconContainer,
      iconTxtContainer,
      normalTxt,
      key,
      value,
    } = styles;
  return (
    <View style={style}>
      <ImageBackground style={[container]} source={iconDic.BG}>
        <View style={[row, balanceContainer]}>
          <Text style={[normalTxt]}>Balance</Text>
          <Text style={[key, flex1]}>{'0x29as8...2828sx99'}</Text>
          <Pressable onPress={() => {}}>
            <Image source={iconDic.Managent} />
          </Pressable>
        </View>
        <View style={[row, valueContainer]}>
          <Text style={[value]}>$287103.124</Text>
        </View>
        <View style={[row, iconContainer, justifySpaceBetween]}>
          <Pressable onPress={() => {}}>
            <View style={[row]}>
              <Image source={iconDic.Sach} />
              <Text style={[normalTxt, iconTxtContainer]}>Sach</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => {}}>
            <View style={[row]}>
              <Image source={iconDic.Transfer} />
              <Text style={[normalTxt, iconTxtContainer]}>Transfer</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => {}}>
            <View style={[row]}>
              <Image source={iconDic.Receivr} />
              <Text style={[normalTxt, iconTxtContainer]}>Receiver</Text>
            </View>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 156.5,
    width: 345,
  },
  balanceContainer: {
    marginTop: 15.5,
    marginHorizontal: 18,
  },
  valueContainer: {marginLeft: 12.5, marginTop: 33},
  iconContainer: {marginHorizontal: 25.5, marginTop: 21.5},
  iconTxtContainer: {marginLeft: 10},
  normalTxt: {fontFamily: 'Helvetica', fontSize: 15, color: 'white'},
  key: {
    fontFamily: 'Helvetica',
    fontSize: 15,
    color: '#899DFE',
    marginLeft: 18.5,
  },
  value: {
    fontFamily: 'Helvetica',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
});

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

export default connect(msp, mdp)(Card);
