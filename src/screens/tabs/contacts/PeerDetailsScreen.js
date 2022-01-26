import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SchemaStyles from '../../../shared/SchemaStyles';
import {connect} from 'react-redux/lib/exports';
import blobIdToUrl from 'ssb-serve-blobs/id-to-url';
import {
  friendsGraphParse,
  mutualFriend,
} from '../../../filters/ContactsFilters';
import useDocumentTitle from '@react-navigation/native/src/useDocumentTitle';
import RoundBtn from '../../../shared/comps/RoundBtn';

const PeerDetailsScreen = ({
  navigation,
  route: {params: fId},
  ssb,
  selfFeedId,
  friendsGraph,
  peerInfoDic,
}) => {
  const iconDic = {
    peerIcon: require('../../../assets/image/contacts/peer_icon.png'),
    daoIcon: require('../../../assets/image/contacts/dao_icon.png'),
    nftIcon: require('../../../assets/image/contacts/nft_icon.png'),
  };
  const {row, flex1, text} = SchemaStyles(),
    {head, textContainer, item, title, desc} = styles,
    {name = '', description = '', image = ''} = peerInfoDic[fId] || {},
    [friends, following, follower, block, blocked, other] = friendsGraphParse(
      friendsGraph,
      fId,
    ),
    [myFriends] = friendsGraphParse(friendsGraph, selfFeedId),
    mutual = mutualFriend(friends, myFriends);

  useEffect(() => {
    navigation.setOptions({title: name || fId});
  });
  useDocumentTitle();

  return (
    <SafeAreaView style={[flex1]}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[item, row, flex1]}>
          <Image
            height={60}
            width={60}
            style={[head]}
            source={image ? {uri: blobIdToUrl(image)} : iconDic.peerIcon}
          />
          <View style={[textContainer]}>
            <Text numberOfLines={1} style={[title, text]}>
              {name || fId}
            </Text>
            {description !== '' && (
              <Text style={[desc]}>bio: {description}</Text>
            )}
          </View>
        </View>
        <Text style={[desc]}>following:{following.length}</Text>
        <Text style={[desc]}>follower:{follower.length}</Text>
        <Text style={[desc]}>mutual:{mutual.length}</Text>
        <RoundBtn
          title={'chat'}
          press={() => navigation.navigate('MessageDetailsScreen', fId)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  head: {
    width: 60,
    height: 60,
  },
  item: {
    height: 80,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  textContainer: {
    marginHorizontal: 15,
    marginVertical: 12,
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 17,
    width: 240,
  },
  desc: {
    marginTop: 4,
    fontFamily: 'Helvetica',
    fontSize: 15,
    color: '#4E586E',
    width: 400,
  },
  searchBar: {marginVertical: 10},
});

const msp = s => {
  return {
    ssb: s.ssb.instance,
    selfFeedId: s.ssb.selfFeedId,
    friendsGraph: s.contacts.friendsGraph,
    peerInfoDic: s.contacts.peerInfoDic,
  };
};

const mdp = d => {
  return {
    addPeerInfo: v => d({type: 'addPeerInfo', payload: v}),
  };
};

export default connect(msp, mdp)(PeerDetailsScreen);
