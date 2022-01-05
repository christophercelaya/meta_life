import React from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux/lib/exports';
import SchemaStyles, {colorsSchema} from '../../../shared/SchemaStyles';
import {useTimer} from '../../../shared/Hooks';
import Section from '../../../shared/comps/Section';
import {follow} from '../../../remote/ssbOP';

const PeersScreen = ({
  navigation,
  ssb,
  feedId,
  stagedPeers,
  setStagedPeers,
  connectedPeers,
  setConnectedPeers,
  addFollowing,
}) => {
  const {textHolder} = colorsSchema;
  const {BG, row, text} = SchemaStyles();
  const {contactItemContainer, textView, nameTF, descTF} = styles;
  useTimer(refreshStagedAndConnected, 3000);

  function refreshStagedAndConnected() {
    ssb.peers.staged(setStagedPeers);
    ssb.peers.connected(setConnectedPeers);
  }

  function connectErrorHandler(e) {
    console.log('conn error: ', e);
    alert('connect reject');
  }

  function connectHandler(v) {
    console.log('connected: ', v);
    alert('follow succeed');
  }

  function fellowErrorHandler(e) {
    console.log('conn error: ', e);
    alert(e.value.content.following ? 'followed yet' : 'follow reject');
  }

  function fellowHandler(v) {
    addFollowing(v);
    alert('Following:', v.key);
  }

  const peerItem = ([address, {type, key, state = ''}], index) => (
    <View key={index} style={[row, contactItemContainer]}>
      <View style={[textView]}>
        <Text style={[nameTF, text]}>{type}</Text>
        <Text
          style={[descTF, {color: textHolder, width: 140}]}
          numberOfLines={1}>
          {key}
        </Text>
        <View style={[row]}>
          {state === 'connected' || (
            <Button
              title={'connect'}
              onPress={() =>
                ssb.peers.connect2Peer(address, {}, (e, v) =>
                  e ? connectErrorHandler(e) : connectHandler(v),
                )
              }
            />
          )}
          <Button
            title={'follow'}
            onPress={() =>
              follow(ssb, key, {}, (e, v) =>
                e ? fellowErrorHandler(e) : fellowHandler(v),
              )
            }
          />
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={BG}>
      {stagedPeers.length > 0 && (
        <Section title={'Staged Peers'}>{stagedPeers?.map(peerItem)}</Section>
      )}
      {connectedPeers.length > 0 && (
        <Section title={'connectedPeers'}>
          {connectedPeers?.map(peerItem)}
        </Section>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 162,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  key: {
    width: '70%',
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

const msp = s => {
  return {
    ssb: s.ssb.instance,
    feedId: s.ssb.feedId.id,
    stagedPeers: s.contacts.stagedPeers,
    setStagedPeers: s.contacts.setStagedPeers,
    connectedPeers: s.contacts.connectedPeers,
    setConnectedPeers: s.contacts.setConnectedPeers,
  };
};

const mdp = d => {
  return {
    setStagedPeers: v => d({type: 'setStagedPeers', payload: v}),
    setConnectedPeers: v => d({type: 'setConnectedPeers', payload: v}),
  };
};

export default connect(msp, mdp)(PeersScreen);
