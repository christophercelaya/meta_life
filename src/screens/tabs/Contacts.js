import React, {useState} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import SchemaStyles, {colorsSchema} from '../../shared/SchemaStyles';
import {connect} from 'react-redux/lib/exports';
import Section from '../../shared/comps/Section';
import {useTimer} from '../../shared/Hooks';
import {
  follow,
  isFollowing,
  reqConnectedPeers,
  reqStagedPeers,
} from '../../remote/ssbOP';

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
    type: 'Maud Newman',
    key: '3 mutual friends',
    icon: iconDic.photo,
  },
];

const Contacts = ({
  navigation,
  stagedPeers,
  setStagedPeers,
  connectedPeers,
  setConnectedPeers,
}) => {
  const {textHolder} = colorsSchema;
  const {BG, row, text} = SchemaStyles();
  const {searchBar, contactItemContainer, textView, nameTF, descTF} = styles;

  const {ssb} = window;
  useTimer(() => reqStagedPeers(ssb, setStagedPeers), 3000);
  useTimer(() => reqConnectedPeers(ssb, setConnectedPeers), 3000);
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

  const peerItem = ([add, {type, key}], index) => (
    <View key={index} style={[row, contactItemContainer]}>
      <View style={[textView]}>
        <Text style={[nameTF, text]}>{type}</Text>
        <Text style={[descTF, {color: textHolder}]}>{key}</Text>
        <Button
          title={'follow'}
          onPress={() => follow(window.ssb, key, null, console.log)}
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={BG}>
      {/*<SearchBar style={[searchBar]} />*/}
      {/*<Section title={'Connect to find more friends'}>*/}
      {/*  <FlatList*/}
      {/*    keyExtractor={(item, index) => index}*/}
      {/*    data={DATA_sn}*/}
      {/*    renderItem={snItem}*/}
      {/*    horizontal={true}*/}
      {/*    ItemSeparatorComponent={null}*/}
      {/*    showsHorizontalScrollIndicator={false}*/}
      {/*  />*/}
      {/*</Section>*/}
      {/*<Section title={'List'}>{DATA_contact.map(contactItem)}</Section>*/}
      <Section title={'stagedPeers'}>{stagedPeers.map(peerItem)}</Section>
      <Section title={'connectedPeers'}>{connectedPeers.map(peerItem)}</Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 162,
    marginVertical: 8,
    marginHorizontal: 16,
  },
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

const msp = s => s.contacts;

const mdp = d => {
  return {
    setStagedPeers: v => d({type: 'setStagedPeers', payload: v}),
    setConnectedPeers: v => d({type: 'setConnectedPeers', payload: v}),
  };
};

export default connect(msp, mdp)(Contacts);
