import React, {useState, useEffect} from 'react';
import {Text, View, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import Head from '../Components/Head';
import axios from 'axios';
import styles from '../style/styles';
import BackButton from '../Components/BackButton';
import AddWatchlist from '../Components/AddWatchlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteWatchlist from '../Components/DeleteWatchlist';

export default function Detail({navigation, route}) {
  const [data, setData] = useState([]);
  const [savedData, setSavedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(Boolean);
  let ide = route.params.id;

  const getDatabase = async () => {
    try {
      let value = await AsyncStorage.getItem('@databaseMovie');
      value = JSON.parse(value);

      if (value !== null) {
        setSavedData(value);
        //console.log(value);
      } else {
        console.log('Kosong');
      }
      setIsLoading(false);
    } catch (err) {
      console.log('Get Data Error', err);
    }
    getData();
  };

  const getData = () => {
    //console.log(ide);
    console.log('get berhasil :' + ide);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${ide}?api_key=15e383204c1b8a09dbfaaa4c01ed7e17`,
      )
      .then(res => {
        setData(res.data);
      });
    checkLegit();
  };

  const add = data => {
    let currentData = savedData;
    currentData.push({
      id: data.id,
      title: data.title,
      poster_path: data.poster_path,
    });

    setSavedData({currentData});
    //console.log('data', currentData);
    saveData(currentData);
    ToastAndroid.show('Added to Watchlist', ToastAndroid.SHORT);
  };

  const deleteData = data => {
    //console.log(saveId);
    let currentData = savedData;
    let index = currentData.findIndex(item => item.id === ide);
    currentData.splice(index, 1);
    setSavedData({currentData});
    saveData(currentData);
    ToastAndroid.show('Deleted from Watchlist', ToastAndroid.SHORT);
  };

  const checkLegit = () => {
    //console.log(savedData.length);
    if (savedData !== null) {
      for (let i = 0; i < savedData.length; i++) {
        //console.log('entered');
        //console.log(saveId[i].item);
        //console.log(tempId);
        if (savedData[i].id === ide) {
          //console.log('true');
          setIsAdded(true);
          break;
        } else {
          //console.log('false');
          setIsAdded(false);
        }
      }
      //console.log(isAdded);
    } else {
      setIsAdded(false);
    }
  };

  const saveData = async data => {
    try {
      await AsyncStorage.setItem('@databaseMovie', JSON.stringify(data));
      setIsLoading(true);
      console.log('save data success :' + data);
    } catch (err) {
      console.log('Save Error', err);
    }
  };

  useEffect(() => {
    isLoading ? getDatabase() : null;
  });

  return (
    <View style={{backgroundColor: '#3a3f47', flex: 1}}>
      <Head title="Detail Movie" />
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w780/${data.backdrop_path}`}}
        style={{height: 200, width: 400}}
      />
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w780/${data.poster_path}`}}
          style={{
            height: 150,
            width: 110,
            marginLeft: 10,
            marginTop: -85,
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 10,
            elevation: 10,
          }}
        />
        <Text
          style={{
            color: 'white',
            marginTop: 20,
            marginLeft: 15,
            textAlign: 'auto',
            marginRight: 120,
            fontSize: 22,
            fontWeight: 'bold',
          }}>
          {data.title}
        </Text>
      </View>
      <Text
        style={{
          color: 'white',
          marginLeft: 20,
          marginTop: 20,
          borderBottomWidth: 1,
          borderColor: 'white',
          fontWeight: 'bold',
          fontSize: 16,
        }}>
        About Movie
      </Text>
      <View>
        <Text style={styles.detailSubtitle}>Overview :</Text>
        <Text style={styles.detailDesc}>{data.overview}</Text>
      </View>
      <View>
        <Text style={styles.detailSubtitle}>Release Date :</Text>
        <Text style={styles.detailDesc}>{data.release_date}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text style={styles.detailSubtitle}>Average Rating :</Text>
          <Text style={styles.detailDesc}>{data.vote_average}</Text>
        </View>
        <View>
          <Text style={[styles.detailSubtitle, {marginLeft: 50}]}>
            Rate Count :
          </Text>
          <Text style={[styles.detailDesc, {marginLeft: 50}]}>
            {data.vote_count}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.detailSubtitle}>Popularity :</Text>
        <Text style={styles.detailDesc}>{data.popularity}</Text>
      </View>
      <TouchableOpacity
        style={{
          height: 40,
          width: 100,
          backgroundColor: '#242a32',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 30,
          left: 20,
          borderRadius: 20,
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <BackButton />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 40,
          width: 100,
          backgroundColor: '#4fcca3',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 30,
          right: 20,
          borderRadius: 20,
        }}
        onPress={() => {
          isAdded ? deleteData(data) : add(data);
        }}>
        {isAdded ? <DeleteWatchlist /> : <AddWatchlist />}
      </TouchableOpacity>
    </View>
  );
}
