import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  TextInput,
} from 'react-native';
import Head from '../Components/Head';
import SearchField from '../Components/SearchField';
import StraightLine from '../Components/StraightLine';
import BackButton from '../Components/BackButton';
import ListEmpty from '../Components/ListEmpty';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../style/styles';

const Watchlist = ({navigation}) => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getDatabase = async () => {
    try {
      let value = await AsyncStorage.getItem('@databaseMovie');
      value = JSON.parse(value);

      if (value !== null) {
        setData(value);
        setFilteredData(value);
        //console.log('getDatabase success: ' + data);
      } else {
        console.log('kosong');
      }
    } catch (err) {
      console.log('Get Data Error', err);
    }
  };

  // const getData = () => {
  //   let savedData = [];
  //   console.log(savedId.length);
  //   for (let i = 0; i < savedId.length; i++) {
  //     let id = savedId[i].item;
  //     console.log(
  //       `https://api.themoviedb.org/3/movie/${id}?api_key=15e383204c1b8a09dbfaaa4c01ed7e17`,
  //     );
  //     // console.log('masuk');
  //     // console.log(id);
  //     axios
  //       .get(
  //         `https://api.themoviedb.org/3/movie/${id}?api_key=15e383204c1b8a09dbfaaa4c01ed7e17`,
  //       )
  //       .then(res => {
  //         //console.log(res);
  //         if (savedData.indexOf(res.data) === -1) {
  //           savedData.push(res.data);
  //           setData(savedData);
  //         } else {
  //           console.log('data sudah ada');
  //         }
  //       })
  //       .catch(err => {
  //         console.log('data error :' + err);
  //       });
  //   }
  //   console.log('data :' + data);
  //   setIsLoading(false);
  // };
  const renderItem = ({item}) => {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <View style={{marginHorizontal: 10, marginVertical: 5}}>
          {console.log('renderItem success: ' + item.title)}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Detail', {id: item.id});
            }}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w780/${item.poster_path}`,
              }}
              style={{
                height: 150,
                width: 110,
                borderRadius: 10,
                elevation: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const clearAsyncStorage = () => {
    AsyncStorage.clear();
    console.log('clear');
  };

  const searchFilterFunction = text => {
    if (text) {
      const newData = data.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchText(text);
    } else {
      setFilteredData(data);
      setSearchText(text);
    }
  };

  const pullMe = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 100);
  };

  useEffect(() => {
    getDatabase();
    return () => {};
  }, [refresh]);

  return (
    <>
      <View style={{backgroundColor: '#3a3f47', flex: 1}}>
        <Head title="Your Watchlist" />
        <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
          <TextInput
            style={styles.textInput}
            placeholder={'Search Here'}
            placeholderTextColor="#fff"
            onChangeText={text => {
              searchFilterFunction(text);
            }}
            value={searchText}
            multiline={true}
          />
          <TouchableOpacity
            style={{
              marginTop: 10,
              right: -30,
              height: 25,
              width: 50,
              alignItems: 'center',
            }}
            onPress={() => {
              pressed();
            }}>
            <View
              style={{
                borderRadius: 20,
                backgroundColor: '#3a3f47',
                paddingHorizontal: 10,
                paddingVertical: 5,
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
        {/* <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{backgroundColor: 'white', left: 20}}
            onPress={() => clearAsyncStorage()}>
            <Text>Wipe Data</Text>
          </TouchableOpacity>
        </View> */}
        <FlatList
          data={filteredData}
          ListEmptyComponent={<ListEmpty />}
          key={'_'}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={item => '_' + item.id}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
          }
        />
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
      </View>
    </>
  );
};

export default Watchlist;
