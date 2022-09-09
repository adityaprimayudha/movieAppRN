import React, {useState, useEffect} from 'react';
import {Text, View, Dimensions} from 'react-native';
import Head from '../Components/Head';
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ListEmpty = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: SCREEN_HEIGHT - 105,
      }}>
      <Text
        style={{
          fontSize: 16,
          fontStyle: 'italic',
          color: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        Your Watchlist is empty
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '300',
          fontStyle: 'italic',
          color: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        Try to add some movies by clicking the add button
      </Text>
    </View>
  );
};
export default ListEmpty;
