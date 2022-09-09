import React, {useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';

const AddWatchlist = () => {
  return (
    <View>
      <Image
        source={{
          uri: 'https://img.icons8.com/ios/50/000000/bookmark-ribbon--v1.png',
        }}
        style={{height: 25, width: 25}}
      />
    </View>
  );
};
export default AddWatchlist;
