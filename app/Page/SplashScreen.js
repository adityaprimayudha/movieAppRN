import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../style/styles';
import {StackActions} from '@react-navigation/native';

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(StackActions.replace('Popular'));
    }, 3000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../Sources/video-camera.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    );
  }
}

export default SplashScreen;
