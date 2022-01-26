import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import SchemaStyles from '../../../../shared/SchemaStyles';
import {connect} from 'react-redux/lib/exports';
import blobIdToUrl from 'ssb-serve-blobs/id-to-url';

const iconDic = {
  peerIcon: require('../../../../assets/image/contacts/peer_icon.png'),
  daoIcon: require('../../../../assets/image/contacts/dao_icon.png'),
  nftIcon: require('../../../../assets/image/contacts/nft_icon.png'),
};

const MessageItem = ({
  navigation,
  ssb,
  peerInfoDic,
  msg: {
    author,
    timestamp,
    content: {type, text: contentText},
  },
}) => {
  const {row, flex1, text} = SchemaStyles();
  const {head, textContainer, item, title, desc} = styles;
  const {name = '', description = '', image = ''} = peerInfoDic[author] || {};
  return (
    <Pressable
      onPress={() => navigation.navigate('MessageDetailsScreen', author)}>
      <View style={[item, row, flex1]}>
        <Image
          height={60}
          width={60}
          style={[head]}
          source={image ? {uri: blobIdToUrl(image)} : iconDic.peerIcon}
        />
        <View style={[textContainer]}>
          <Text numberOfLines={1} style={[title, text]}>
            {contentText}
          </Text>
          <Text style={[desc]}>{timestamp}</Text>
        </View>
      </View>
    </Pressable>
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
    peerInfoDic: s.contacts.peerInfoDic,
  };
};

const mdp = d => {
  return {
    addPeerInfo: v => d({type: 'addPeerInfo', payload: v}),
  };
};

export default connect(msp, mdp)(MessageItem);
