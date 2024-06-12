/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { externalStyles } from './common/styles';
import images from './assets/images';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './common/color';
import LoginScreen from './screens/LoginScreen';

// splash screen 
function SplashScreen() {

  const navigation = useNavigation();

  // setTimeout(() => {
  //   navigation.navigate('MyTabs');
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'MyTabs' }],
  //   });
  // }, 3000);

  return (
    <SafeAreaView style={externalStyles.splash_safeAreaView} >
      <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={'dark-content'} />
      <ImageBackground source={images.splash_background}
        style={externalStyles.splash_imageBackground}>
        <Image source={images.app_logo} style={externalStyles.splash_image} />
      </ImageBackground>
    </SafeAreaView>
  );
};


function App() {

  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={externalStyles.safeAreaViewContainer}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={colors.black}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName='LoginScreen'>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
