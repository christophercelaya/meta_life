import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SchemaStyles from '../../../shared/SchemaStyles';
import {connect} from 'react-redux/lib/exports';
import blobIdToUrl from 'ssb-serve-blobs/id-to-url';
import MsgInput from './MsgInput';
import {sendMsg} from '../../../remote/ssbOP';

const iconDic = {
  peerIcon: require('../../../assets/image/contacts/peer_icon.png'),
};

const MessageDetailsScreen = ({
  navigation,
  route: {
    params: {recp, msgArr},
  },
  ssb,
  feedId,
  peerInfoDic,
}) => {
  const {BG, FG, row, flex1, text} = SchemaStyles(),
    {head, textContainer, item, title, desc} = styles,
    {name = '', description = '', image = ''} = peerInfoDic[recp] || {};

  const headerRight = () => (
    <Image
      height={30}
      width={30}
      style={[head]}
      source={image ? {uri: blobIdToUrl(image)} : iconDic.peerIcon}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      title: name || recp,
      headerRight,
    });
  });

  function sendHandler(content) {
    sendMsg(ssb, content, [recp, feedId]);
  }

  return (
    <SafeAreaView style={[flex1, FG]}>
      <ScrollView style={[flex1, BG]}>
        {msgArr.map(({key, value: {author, content, timestamp}}) => (
          <View key={key} style={[textContainer]}>
            <View style={[item, row]}>
              <View style={[]}>
                <Text style={[desc]}>{author.substr(0, 8)}</Text>
                <Text style={[title, text]}>{content.text}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <MsgInput sendHandler={sendHandler} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  head: {
    width: 30,
    height: 30,
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
    feedId: s.ssb.feedId,
    peerInfoDic: s.contacts.peerInfoDic,
    privateMsg: s.msg.privateMsg,
  };
};

const mdp = d => {
  return {
    addPeerInfo: v => d({type: 'addPeerInfo', payload: v}),
  };
};

export default connect(msp, mdp)(MessageDetailsScreen);
