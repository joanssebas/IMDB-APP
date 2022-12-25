import {View, Text, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';
import normalize from 'react-native-normalize';
import MovieCard from '../components/MovieCard';

const SearchMovie = () => {
  const [search, setSearch] = useState('');
  const [dataMovies, setDataMovies] = useState([]);

  // Aqui se setean los valores ingresados en el campo de busqueda
  const updateSearch = search => {
    const filteredSearch = search.replace(/[^a-z]/gi, '');
    setSearch(filteredSearch);
  };

  // se consume el API que devuelve las peliculas de acuerdo al nombre ingresado
  const getSearchedMovies = async (movie: string) => {
    let dataResponse;

    try {
      await fetch(`https://imdb-api.com/API/SearchTitle/k_kdt89omq/${movie}`)
        .then(response => response.json())
        .then(data => {
          dataResponse = data;
          setDataMovies(data);
        });
    } catch (error) {
      console.log({error});
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (search.length >= 2) {
        getSearchedMovies(search);
      }
    }, [search]),
  );
  return (
    <View>
      <View
        style={{
          marginVertical: normalize(10),
          marginHorizontal: normalize(10),
          borderRadius: normalize(20),
        }}>
        <Searchbar
          placeholder="Busca tu película"
          onChangeText={value => updateSearch(value)}
          value={search}
        />
      </View>
      {dataMovies.errorMessage !== '' && (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{
              marginVertical: normalize(20),
              width: normalize(200),
              height: normalize(200),
              backgroundColor: 'transparent',
              borderRadius: 10,
            }}
            resizeMode="cover"
            source={{
              uri: 'https://img.freepik.com/free-vector/business-team-looking-new-people-allegory-searching-ideas-staff-woman-with-magnifier-man-with-spyglass-flat-illustration_74855-18236.jpg?w=740&t=st=1671921084~exp=1671921684~hmac=ac6cdec43270d4dbca8b89907e6f93b6e7cb285eb6a891f72e085694b379f4dd',
            }}
          />
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Ingresa el nombre de una película
          </Text>
        </View>
      )}

      {search.length >= 3 && (
        <ScrollView>
          <View style={{marginBottom: normalize(100)}}>
            {dataMovies.results &&
              dataMovies.results.map((item, index) => {
                return <MovieCard item={item} index={index} />;
              })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default SearchMovie;
