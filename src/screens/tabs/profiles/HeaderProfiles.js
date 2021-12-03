import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import SchemaStyles from '../../../shared/SchemaStyles';

const iconDic = {
  BG: require('../../../assets/image/profiles/Profiles_backgroud.png'),
  icon_setting: require('../../../assets/image/profiles/Profiles_icon_setting.png'),
  photo: require('../../../assets/image/profiles/photo.png'),
};

const HeaderProfiles = ({navigation}) => {
  const {alignItemsCenter, marginTop10} = SchemaStyles();
  const {container, photo, setting, name, at} = styles;

  return (
    <ImageBackground style={[container, alignItemsCenter]} source={iconDic.BG}>
      <Image style={[photo]} source={iconDic.photo} />
      <Text style={[name, marginTop10]}>Blanche Hall</Text>
      <Text style={[at]}>@jorgecutis</Text>
      <Pressable
        style={[setting]}
        onPress={() => {
          console.log('pressed');
          navigation.navigate('Setting');
        }}>
        <Image source={iconDic.icon_setting} />
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 290,
  },
  photo: {
    marginTop: 47,
  },
  setting: {
    position: 'absolute',
    right: 15,
    top: 56,
  },
  name: {
    fontSize: 23,
    color: 'white',
    fontWeight: 'bold',
  },
  at: {
    marginTop: 4,
    fontSize: 13,
    color: 'white',
  },
});

export default HeaderProfiles;
