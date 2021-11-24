import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SchemaStyles, {colorsSchema} from '../../shared/SchemaStyles';
import {connect} from 'react-redux/lib/exports';
import SearchBar from '../../shared/comps/SearchBar';

const iconDic = {
  photo: require('../../assets/image/profiles/photo.png'),
  fb: require('../../assets/image/profiles/Facebook.png'),
  nf: require('../../assets/image/profiles/NewFriends.png'),
  tt: require('../../assets/image/profiles/Twitter.png'),
};

const DATA_sn = [
  {name: 'Christopher', icon: iconDic.photo},
  {name: 'Christopher', icon: iconDic.photo},
  {name: 'Christopher', icon: iconDic.photo},
  {name: 'Christopher', icon: iconDic.photo},
  {name: 'Christopher', icon: iconDic.photo},
  {name: 'Christopher', icon: iconDic.photo},
  {name: 'Christopher', icon: iconDic.photo},
  {name: 'Christopher', icon: iconDic.photo},
  {name: 'Christopher', icon: iconDic.photo},
];
const DATA_contact = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Maud Newman',
    desc: "Hey! How's it going?",
    icon: iconDic.photo,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Maud Newman',
    desc: "Hey! How's it going?",
    icon: iconDic.photo,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Maud Newman',
    desc: "Hey! How's it going?",
    icon: iconDic.photo,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Maud Newman',
    desc: "Hey! How's it going?",
    icon: iconDic.photo,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Maud Newman',
    desc: "Hey! How's it going?",
    icon: iconDic.photo,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Maud Newman',
    desc: "Hey! How's it going?",
    icon: iconDic.photo,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Maud Newman',
    desc: "Hey! How's it going?",
    icon: iconDic.photo,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Maud Newman',
    desc: "Hey! How's it going?",
    icon: iconDic.photo,
  },
];

const Messages = ({navigation}) => {
  const {textHolder} = colorsSchema;
  const {FG, BG, row, text, alignItemsCenter, marginTop10} = SchemaStyles();
  const {searchBar, contactItemContainer, textView, nameTF, descTF} = styles;

  const snItem = ({item: {name, icon}}) => (
    <View
      style={[{marginHorizontal: 10, marginVertical: 20}, alignItemsCenter]}>
      <Image
        style={[{width: 50, height: 50}]}
        resizeMode={'stretch'}
        height={50}
        width={50}
        source={icon}
      />
      <Text style={[{color: textHolder, marginTop: 13}]}>{name}</Text>
    </View>
  );
  const contactItem = ({id, name, desc, icon}, index) => (
    <View key={index} style={[FG, row, contactItemContainer]}>
      <Image source={icon} />
      <View style={[textView]}>
        <Text style={[nameTF, text]}>{name}</Text>
        <Text style={[descTF, {color: textHolder}]}>{desc}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={BG}>
      <SearchBar style={[searchBar]} />
      <View style={[marginTop10]} />
      <View style={[FG]}>
        <FlatList
          keyExtractor={(item, index) => index}
          data={DATA_sn}
          contentContainerStyle={[FG]}
          renderItem={snItem}
          horizontal={true}
          ItemSeparatorComponent={null}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={[marginTop10]} />
      {DATA_contact.map(contactItem)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contactItemContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchBar: {marginVertical: 10},
  textView: {
    marginTop: 12,
    marginLeft: 15,
  },
  nameTF: {
    fontSize: 18,
    marginBottom: 10,
  },
  descTF: {
    fontSize: 15,
  },
});

const msp = s => s.cfg;

const mdp = d => {
  return {
    setDarkMode: darkMode => d({type: 'setDarkMode', payload: darkMode}),
  };
};

export default connect(msp, mdp)(Messages);
