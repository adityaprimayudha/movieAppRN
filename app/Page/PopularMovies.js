import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Head from '../Components/Head';
import StraightLine from '../Components/StraightLine';
import SearchField from '../Components/SearchField';
import axios from 'axios';

const PopularMovies = ({navigation}) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [load, setLoad] = useState(false);

  const getData = async () => {
    setLoad(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&page=${currentPage}`,
      )
      .then(res => {
        setPopularMovies([...popularMovies, ...res.data.results]);
        setLoad(false);
      });
  };

  const renderItem = ({item}) => {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
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

  useEffect(() => {
    getData();
  }, [currentPage]);

  return (
    <>
      {console.log(popularMovies)}
      <View style={{backgroundColor: '#3a3f47', flex: 1}}>
        <View style={{flexDirection: 'row', backgroundColor: '#242a32'}}>
          <Head title="Popular Movies" />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 15,
              top: 5,
            }}
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Image
              source={{
                uri: 'https://www.iconsdb.com/icons/preview/white/search-3-xxl.png',
              }}
              style={{height: 25, width: 25}}
            />
          </TouchableOpacity>
        </View>
        <StraightLine />
        <FlatList
          key={'_'}
          numColumns={3}
          data={popularMovies}
          renderItem={renderItem}
          keyExtractor={item => '_' + item.id}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0.5}
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
      </View>
    </>
  );
};

export default PopularMovies;
