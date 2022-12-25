import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import VideoPlayer from 'react-native-video-player';
import normalize from 'react-native-normalize';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';
import {Icon} from 'react-native-elements';

const MovieInformation = ({route}) => {
  const {item} = route.params;
  const [dataMovies, setDataMovies] = useState([]);
  const navigation = useNavigation();
  const getTrailer = async (id: string) => {
    try {
      await fetch(`https://imdb-api.com/API/Trailer/k_kdt89omq/${id}`)
        .then(response => response.json())
        .then(data => {
          setDataMovies(data);
        });
    } catch (error) {
      console.log({error});
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getTrailer(item.id);
    }, []),
  );

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: normalize(10),
        }}>
        <Icon
          onPress={() => navigation.navigate('SearchMovie')}
          size={40}
          name="arrow-back"
          type="ionicon"
          color="black"
        />
        <Text style={{fontSize: normalize(18), color: 'black'}}>Back</Text>
      </View>

      <View style={{flex: 1, marginHorizontal: normalize(10)}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: normalize(20),
            marginVertical: normalize(15),
          }}>
          Título: {dataMovies.title}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',

            color: 'black',
            fontSize: normalize(20),
            marginVertical: normalize(15),
          }}>
          Año: {dataMovies.year}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: normalize(20),
            marginVertical: normalize(15),
          }}>
          Tipo: {dataMovies.type}
        </Text>
        <Text
          numberOfLines={7}
          style={{
            fontWeight: 'bold',

            color: 'black',
            fontSize: normalize(20),
            marginVertical: normalize(15),
          }}>
          Argumento: {dataMovies.videoDescription}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          marginHorizontal: normalize(10),
          marginVertical: normalize(20),
        }}>
        {/* <VideoPlayer
          video={{
            uri: 'https://www.imdb.com/video/vi59490329',
          }}
          videoWidth={1600}
          videoHeight={900}
          thumbnail={{uri: dataMovies.thumbnailUrl}}
        
        /> */}
        {/* No se tuvo en cuenta esta opcion porque la respuesta de los links no cuentan con un tipo de formato de video */}

        <WebView
          contentMode="mobile"
          allowsFullscreenVideo={true}
          source={{uri: dataMovies.link}}
        />
      </View>
    </View>
  );
};

export default MovieInformation;
