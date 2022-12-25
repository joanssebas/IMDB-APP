import {View, Text} from 'react-native';
import React from 'react';
import SearchMovie from './src/screens/SearchMovie';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MovieInformation from './src/screens/MovieInformation';
import {Provider as PaperProvider} from 'react-native-paper';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SearchMovie" component={SearchMovie} />
          <Stack.Screen name="MovieInformation" component={MovieInformation} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
