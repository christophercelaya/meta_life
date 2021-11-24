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
import Section from '../../shared/comps/Section';

const iconDic = {
  photo: require('../../assets/image/profiles/photo.png'),
  fb: require('../../assets/image/profiles/Facebook.png'),
  nf: require('../../assets/image/profiles/NewFriends.png'),
  tt: require('../../assets/image/profiles/Twitter.png'),
};

const DATA_sn = [{icon: iconDic.fb}, {icon: iconDic.nf}, {icon: iconDic.tt}];
const DATA_contact = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Maud Newman',
    desc: '3 mutual friends',
    icon: iconDic.photo,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Maud Newman',
    desc: '3 mutual friends',
    icon: iconDic.photo,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Maud Newman',
    desc: '3 mutual friends',
    icon: iconDic.photo,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Maud Newman',
    desc: '3 mutual friends',
    icon: iconDic.photo,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Maud Newman',
    desc: '3 mutual friends',
    icon: iconDic.photo,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Maud Newman',
    desc: '3 mutual friends',
    icon: iconDic.photo,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Maud Newman',
    desc: '3 mutual friends',
    icon: iconDic.photo,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Maud Newman',
    desc: '3 mutual friends',
    icon: iconDic.photo,
  },
];

const Contacts = ({navigation}) => {
  const {textHolder} = colorsSchema;
  const {BG, row, text} = SchemaStyles();
  const {searchBar, contactItemContainer, textView, nameTF, descTF} = styles;

  const snItem = ({item: {icon}}) => (
    <View style={styles.item}>
      <Image source={icon} />
    </View>
  );
  const contactItem = ({id, name, desc, icon}, index) => (
    <View key={index} style={[row, contactItemContainer]}>
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
      <Section title={'Connect to find more friends'}>
        <FlatList
          keyExtractor={(item, index) => index}
          data={DATA_sn}
          renderItem={snItem}
          horizontal={true}
          ItemSeparatorComponent={null}
          showsHorizontalScrollIndicator={false}
        />
      </Section>
      <Section title={'List'}>{DATA_contact.map(contactItem)}</Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contactItemContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 22,
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

export default connect(msp, mdp)(Contacts);
