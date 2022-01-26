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
import {privateMsgParser} from '../../../filters/MsgFilters';

const MessageDetailsScreen = ({
  navigation,
  privateMsg,
  route: {params: author},
  ssb,
  feedId,
  peerInfoDic,
}) => {
  const iconDic = {
    peerIcon: require('../../../assets/image/contacts/peer_icon.png'),
  };

  const msgArray = privateMsg.messages
    ? privateMsgParser(privateMsg.messages, author)
    : {};

  const {BG, FG, row, flex1, text} = SchemaStyles(),
    {head, textContainer, item, title, desc} = styles,
    {name = '', description = '', image = ''} = peerInfoDic[author] || {};

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
      title: name || author,
      headerRight,
    });
  });

  function sendHandler(content) {
    ssb.publish(
      {
        type: 'post',
        text: content,
        recps: [author, feedId],
      },
      (e, v) => (e ? console.warn(e) : console.log(v)),
    );
  }

  return (
    <SafeAreaView style={[flex1, FG]}>
      <ScrollView style={[flex1, BG]}>
        <View style={[item, row]}>
          {privateMsg.messages &&
            privateMsg.messages.map(v => (
              <View key={v.key} style={[textContainer]}>
                <Text style={[title, text]}>{v.value.content.text}</Text>
                <Text style={[desc]}>{v.value.content.timestamp}</Text>
              </View>
            ))}
        </View>
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
