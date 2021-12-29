import React, {useEffect} from 'react';
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SchemaStyles, {colorsSchema} from '../../shared/SchemaStyles';
import {connect} from 'react-redux/lib/exports';
import Section from '../../shared/comps/Section';
import {follow} from '../../remote/ssbOP';
import {useNavigationState} from '@react-navigation/native';
import {friendParser} from '../../Utils';
import SearchBar from '../../shared/comps/SearchBar';

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
let intervalId = NaN;

const Contacts = ({
  navigation,
  ssb,
  feedId,
  stagedPeers,
  setStagedPeers,
  connectedPeers,
  setConnectedPeers,
  setFriendsGraph,
  friendsGraph,
  addFollowing,
}) => {
  const {textHolder} = colorsSchema;
  const {BG, row, flex1, text} = SchemaStyles();
  const {searchBar, contactItemContainer, textView, nameTF, descTF} = styles;
  // refresh peers when tab index is 2 (contacts screen)
  const index = useNavigationState(state => state.index);
  if (index === 2 && isNaN(intervalId)) {
    intervalId = setInterval(() => {
      ssb.peers.staged(setStagedPeers);
      ssb.peers.connected(setConnectedPeers);
    }, 3000);
  } else if (index !== 2 && !isNaN(intervalId)) {
    clearInterval(intervalId);
    intervalId = NaN;
  }
  useEffect(() => {
    ssb.peers.stage((e, v) => (e ? console.warn(e) : console.log('staged')));
    ssb.friends.graph((e, v) => (e ? console.warn(e) : setFriendsGraph(v)));
  }, []);
  // useTimer will not remove interval cause this is tab screen(never unmount)
  // useTimer(() => ssb.peers.staged(setStagedPeers), 3000);
  // useTimer(() => ssb.peers.connected(setConnectedPeers), 3000);

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
        <Text style={[descTF, {color: textHolder}]}>{key}</Text>
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

  const friendItem = k => (
    <View key={k} style={[styles.item, row, flex1]}>
      <Image source={iconDic.photo} />
      <Text style={[styles.key, text]}>key:{k}</Text>
    </View>
  );

  const friends = friendsGraph ? friendParser(friendsGraph[feedId])[0] : [];
  return (
    <ScrollView style={BG}>
      <SearchBar style={[searchBar]} />
      {/*<FlatList*/}
      {/*  keyExtractor={(item, index) => index}*/}
      {/*  data={stargedArr}*/}
      {/*  renderItem={peerItem}*/}
      {/*  horizontal={true}*/}
      {/*  ItemSeparatorComponent={null}*/}
      {/*  showsHorizontalScrollIndicator={false}*/}
      {/*/>*/}
      {stagedPeers.length > 0 && (
        <Section title={'Staged Peers'}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {stagedPeers?.map(peerItem)}
          </ScrollView>
        </Section>
      )}
      {connectedPeers.length > 0 && (
        <Section title={'connectedPeers'}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {connectedPeers?.map(peerItem)}
          </ScrollView>
        </Section>
      )}
      {friends.length > 0 && (
        <Section title={'friends'}>{friends.map(friendItem)}</Section>
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
    friendsGraph: s.contacts.friendsGraph,
    connectedPeers: s.contacts.connectedPeers,
    setConnectedPeers: s.contacts.setConnectedPeers,
  };
};

const mdp = d => {
  return {
    setStagedPeers: v => d({type: 'setStagedPeers', payload: v}),
    setConnectedPeers: v => d({type: 'setConnectedPeers', payload: v}),
    addFollowing: v => d({type: 'addFollowing', payload: v}),
    setFriendsGraph: v => d({type: 'setFriendsGraph', payload: v}),
  };
};

export default connect(msp, mdp)(Contacts);
