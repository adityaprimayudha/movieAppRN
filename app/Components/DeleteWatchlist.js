import React, {useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';

const DeleteWatchlist = () => {
  return (
    <View>
      <Image
        source={{
          uri: 'https://img.icons8.com/ios-filled/50/000000/bookmark-ribbon.png',
        }}
        style={{height: 25, width: 25}}
      />
    </View>
  );
};
export default DeleteWatchlist;
