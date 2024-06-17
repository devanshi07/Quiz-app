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
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import { FeedbackFormScreen } from './screens/FeedbackFormScreen';
import QuizResultScreen from './screens/QuizResultScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SH } from './common/dimensions';
import LeaderBoardScreen from './screens/LeaderBoardScreen';
import NotificationScreen from './screens/NotificationScreen';
import { USER_ID, getSession } from './common/LocalStorage';
import MyProfileScreen from './screens/MyProfileScreen';

// splash screen 
function SplashScreen() {

  const navigation = useNavigation();
  var isCall = true;

  setTimeout(() => {
    {
      async function checkData() {
        const userId = await getSession(USER_ID);
        console.log("SplashScreen2=>" + (userId === null));
        console.log("SplashScreen2=>" + (userId));
        console.log("SplashScreen2=>" + (isCall));
        if (isCall) {
          if (userId === null) {
            navigation.navigate('LoginScreen');
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            });
            isCall = false;
          } else {
            navigation.navigate('HomeScreen');
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomeScreen' }],
            });
            isCall = false;
          }
        }
      }
      checkData();
    }
  }, 3000);

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
  const Tab = createBottomTabNavigator();
  const HomeStack = createNativeStackNavigator();

  function MyTabs() {
    return (
      <View style={externalStyles.topTabsView}>
        <Tab.Navigator initialRouteName='HomeScreen1'
          screenOptions={{
            tabBarStyle: externalStyles.topTabsBarStyle,
            tabBarLabelStyle: externalStyles.topTabsBarLabelStyle,
            swipeEnabled: false,
            tabBarItemStyle: externalStyles.topTabsItemStyle,
            tabBarIndicatorStyle: externalStyles.topTabsBarIndicatorStyle,
            tabBarShowLabel: false,
            headerShown: false
          }}>
          <Tab.Screen name="LeaderBoardScreen"
            options={{
              tabBarIcon: ({ color }) => <Image source={images.bottom_tab_home} style={externalStyles.topTabsBarIcon} />,
            }} >
            {() => (
              <HomeStack.Navigator screenOptions={{
                headerShown: false,
              }} initialRouteName='LeaderBoardScreen1'>
                <HomeStack.Screen name="LeaderBoardScreen1" component={LeaderBoardScreen} />
              </HomeStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen name="HomeScreen1" component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 22, // space from bottombar
                    height: SH(65),
                    width: SH(65),
                    borderRadius: 360,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.themeYellowColor,
                    zIndex: 1,
                  }}
                >
                  <Image source={images.bottom_tab_plus} style={externalStyles.topTabsBarIcon} />
                </View>
              ),
            }} />
          <Tab.Screen name="NotificationScreen" component={MyProfileScreen}
            options={{
              tabBarIcon: ({ color }) => <Image source={images.bottom_tab_alert} style={externalStyles.topTabsBarIcon} />,
            }} />
        </Tab.Navigator>
      </View>
    );
  }

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
          initialRouteName='SplashScreen'>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={MyTabs} />
          <Stack.Screen name="QuizScreen" component={QuizScreen} />
          <Stack.Screen name="FeedbackFormScreen" component={FeedbackFormScreen} />
          <Stack.Screen name="QuizResultScreen" component={QuizResultScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
