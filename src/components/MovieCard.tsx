import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import normalize from 'react-native-normalize';

const MovieCard = props => {
  // props de cada card para setear los valores del nombre y la imagen
  const {item, index} = props;

  const navigation = useNavigation();

  useFocusEffect;
  return (
    <TouchableOpacity
      key={index}
      onPress={() =>
        navigation.navigate('MovieInformation', {
          // se pasa por parametros el item con toda la informacion para ser consumida en la pantalla que muestra el trailer de la película
          item: item,
        })
      }>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: normalize(15),
        }}>
        <View style={[styles.container, styles.backgroundLight]}>
          <View
            style={{
              width: '90%',
              height: normalize(40),
              marginBottom: normalize(10),

              flexWrap: 'wrap',
            }}>
            <Text
              numberOfLines={1}
              style={[styles.MovieName, styles.textLight]}>
              {' '}
              Nombre: {item.title}
            </Text>
          </View>
          <Image
            style={styles.MovieImage}
            resizeMode="cover"
            source={{
              uri: item.image
                ? item.image
                : 'https://cdn-icons-png.flaticon.com/512/258/258948.png?w=740&t=st=1671889857~exp=1671890457~hmac=3fdc267beff52fe55fe947885be9998270fbd99dfea9dcb00143fc5226d83d7b',
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  MovieImage: {
    width: normalize(130),
    height: normalize(200),
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  container: {
    height: normalize(270),
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,

    elevation: 40,
  },
  backgroundDark: {
    backgroundColor: '#2D3742',
  },
  backgroundLight: {
    backgroundColor: '#FFFFFF',
  },
  textDark: {
    color: '#FFFFFF',
  },
  textLight: {
    color: '#222C36',
  },

  MovieName: {
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'flex-start',
    textAlign: 'left',
    marginVertical: normalize(10),
  },
  infoBold: {
    fontWeight: 'bold',
    marginLeft: 25,
  },
});

export default MovieCard;
