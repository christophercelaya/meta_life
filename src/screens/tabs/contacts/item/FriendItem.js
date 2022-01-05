import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import SchemaStyles from '../../../../shared/SchemaStyles';
import {connect} from 'react-redux/lib/exports';

const FriendItem = ({fId, ssb, peerInfoDic, addPeerInfo}) => {
  const iconDic = {
    peerIcon: require('../../../../assets/image/contacts/peer_icon.png'),
    daoIcon: require('../../../../assets/image/contacts/dao_icon.png'),
    nftIcon: require('../../../../assets/image/contacts/nft_icon.png'),
  };
  const {row, flex1, text} = SchemaStyles();
  const {item, key} = styles;
  // const info = peerInfoDic.hasOwnProperty(fId)
  //   ? peerInfoDic[peerInfoDic]
  //   : ssb.friends.get(key, (e, v) => addPeerInfo(v));

  return (
    <Pressable key={fId} onPress={null}>
      <View style={[item, row, flex1]}>
        <Image source={iconDic.peerIcon} />
        <Text style={[key, text]}>{fId}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 80,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  key: {
    width: '70%',
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

export default connect(msp, mdp)(FriendItem);
