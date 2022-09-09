import React, {useState, useEffect} from 'react';
import {Text, View, StatusBar} from 'react-native';
import styles from '../style/styles';

const Head = props => {
  return (
    <View style={styles.header}>
      <StatusBar backgroundColor="#242a32" barStyle="light-content" />
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
};

export default Head;
