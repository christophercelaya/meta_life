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
import {privateMsgFilter} from '../../../Utils';
import MsgInput from './MsgInput';

const MessageDetailsScreen = ({
  navigation,
  privateMsg,
  route: {params: author},
  ssb,
  peerInfoDic,
}) => {
  const iconDic = {
    peerIcon: require('../../../assets/image/contacts/peer_icon.png'),
  };

  const msgArray = privateMsgFilter(privateMsg, author);

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
        recps: [author],
      },
      (e, v) => (e ? console.warn(e) : console.log(v)),
    );
  }

  return (
    <SafeAreaView style={[flex1, FG]}>
      <ScrollView style={[flex1, BG]}>
        <View style={[item, row]}>
          <View style={[textContainer]}>
            <Text style={[title, text]}>
              message content message content message content
            </Text>
            {description !== '' && <Text style={[desc]}>time stemp</Text>}
          </View>
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
