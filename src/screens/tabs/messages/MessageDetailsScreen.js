import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SchemaStyles from '../../../shared/SchemaStyles';
import {connect} from 'react-redux/lib/exports';
import blobIdToUrl from 'ssb-serve-blobs/id-to-url';

const MessageDetailsScreen = ({
  navigation,
  route: {params: fId},
  ssb,
  peerInfoDic,
}) => {
  const iconDic = {
    peerIcon: require('../../../assets/image/contacts/peer_icon.png'),
  };
  const {row, flex1, text, input} = SchemaStyles(),
    {head, textContainer, item, title, desc, inputTextS} = styles,
    {name = '', description = '', image = ''} = peerInfoDic[fId] || {};

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
      title: name || fId,
      headerRight,
    });
  });

  // const inputAccessoryViewID = 'uniqueID';
  const initialText = '';
  const [inputText, setInputText] = useState(initialText);

  return (
    <SafeAreaView style={[flex1]}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[item, row, flex1]}>
          <View style={[textContainer]}>
            <Text numberOfLines={1} style={[title, text]}>
              {name || fId}
            </Text>
            {description !== '' && (
              <Text style={[desc]}>bio: {description}</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <ScrollView keyboardDismissMode="interactive">
        <TextInput
          style={[inputTextS, input]}
          // inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={setInputText}
          value={inputText}
          placeholder={'Write a comment …'}
        />
      </ScrollView>
      {/*if custom ui use in ios*/}
      {/*<InputAccessoryView nativeID={inputAccessoryViewID}>*/}
      {/*  <Button onPress={() => setInputText(initialText)} title="Clear text" />*/}
      {/*</InputAccessoryView>*/}
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
