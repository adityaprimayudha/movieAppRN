import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from '../style/styles';

const BackButton = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        style={{height: 20, width: 20, marginRight: 5}}
        source={{
          uri: 'https://www.iconsdb.com/icons/preview/color/EEEEEE/arrow-92-xxl.png',
        }}
      />
      <Text style={{color: '#EEEEEE'}}>Back</Text>
    </View>
  );
};
export default BackButton;
