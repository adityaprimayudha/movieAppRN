import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './app/style/styles.js';
import Popular from './app/Page/PopularMovies';
import SplashScreen from './app/Page/SplashScreen';
import Watchlist from './app/Page/Watchlist.js';
import Detail from './app/Page/Detail';
import Search from './app/Page/SearchPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Popular" component={Popular} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Watchlist" component={Watchlist} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
