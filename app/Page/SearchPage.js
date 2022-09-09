import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Head from '../Components/Head';
import StraightLine from '../Components/StraightLine';
import axios from 'axios';
import styles from '../style/styles';
import BackButton from '../Components/BackButton';

const SearchPage = ({navigation}) => {
  const [searchMovies, setsearchMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [tempText, setTempText] = useState('');
  const [load, setLoad] = useState(false);

  const getData = async () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&page=${currentPage}&query=${searchText}`,
      )
      .then(res => {
        setsearchMovies([...searchMovies, ...res.data.results]);
        setLoad(false);
      });
  };

  const renderItem = ({item}) => {
    return (
      <View style={{marginHorizontal: 10, marginVertical: 5}}>
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
    );
  };

  const renderLoader = () => {
    return load ? (
      <View
        style={{
          marginVertical: 10,
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    ) : null;
  };

  const loadMoreItems = () => {
    setCurrentPage(currentPage + 1);
  };

  const pressed = () => {
    setsearchMovies([]);
    setLoad(true);
    setSearchText(tempText);
  };

  useEffect(() => {
    getData();
  }, [searchText]);

  return (
    <>
      <View style={{backgroundColor: '#3a3f47', flex: 1}}>
        <Head title="Popular Movies" />
        <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
          <TextInput
            style={styles.textInput}
            placeholder={'Search Here'}
            placeholderTextColor="#fff"
            onChangeText={text => {
              setTempText(text);
            }}
            value={setTempText}
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
        <StraightLine />
        <FlatList
          key={'_'}
          numColumns={3}
          data={searchMovies}
          renderItem={renderItem}
          keyExtractor={item => '_' + item.id}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={1}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#4fcca3',
            alignItems: 'center',
            justifyContent: 'center',
            width: 125,
            height: 50,
            borderRadius: 10,
            position: 'absolute',
            bottom: 20,
            right: 20,
            flexDirection: 'row',
          }}
          onPress={() => {
            navigation.navigate('Watchlist');
          }}>
          <Text style={{color: '#242a32', fontSize: 16, fontWeight: 'bold'}}>
            Watchlist
          </Text>
          <Image
            source={{
              uri: 'https://www.iconsdb.com/icons/preview/black/bookmark-5-xxl.png',
            }}
            style={{height: 25, width: 25, marginLeft: 5}}
          />
        </TouchableOpacity>
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

export default SearchPage;
