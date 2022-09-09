import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from '../style/styles';

const SearchField = () => {
  return (
    <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
      <TextInput
        style={styles.textInput}
        placeholder={'Search Here'}
        placeholderTextColor="#fff"
      />
      <TouchableOpacity
        style={{
          marginTop: 10,
        }}>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: '#3a3f47',
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginLeft: 20,
          }}>
          <Image
            source={{
              uri: 'https://www.iconsdb.com/icons/preview/white/search-3-xxl.png',
            }}
            style={{height: 25, width: 25}}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchField;
