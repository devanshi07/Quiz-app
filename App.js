/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  Pressable,
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
import { FCM_TOKEN, TOKEN, USER_ID, clearAsyncStorage, getSession, saveSession } from './common/LocalStorage';
import MyProfileScreen from './screens/MyProfileScreen';
import QuizScreen2 from './screens/QuizScreen2';
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import MyResultsScreen from './screens/MyResultsScreen';
import { APP_NAME } from './common/string';
import { GET_PROFILE } from './common/webUtils';
import { CustomConsole, getPopBoldFont, getPopRegularFont, getPopSemiBoldFont } from './common/utils';
import CommonWeb from './screens/CommonWeb';
import AvatarUpdateScreen from './screens/AvatarUpdateScreen';
import ConsistResultsScreen from './screens/ConsistResultsScreen';
import PerformanceResultsScreen from './screens/PerformanceResultsScreen';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import PushNotification from 'react-native-push-notification';

// splash screen 
function SplashScreen() {

  const navigation = useNavigation();
  var isCall = true;

  // firebase
  // Your secondary Firebase project credentials for Android...
  const androidCredentials = {
    clientId: '596884770601',
    appId: '1:596884770601:android:509e9a09bd6060f656f138',
    apiKey: 'AIzaSyB5PFwlS2GMGKYi4YW1xhNMAYfcjTLFZ7A',
    projectId: 'yuva-pahel',
    databaseURL: '',
    storageBucket: 'yuva-pahel.appspot.com',
    messagingSenderId: '596884770601',
  };

  // Select the relevant credentials
  const credentials = Platform.select({
    android: androidCredentials
  });

  useEffect(() => {
    if (!firebase.apps.length) {
      initFirebase();
    }

    // pushnotification configure
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        // console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
      },
      popInitialNotification: true,
      requestPermissions: true,
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: false,
        sound: false,
      },
    });

    getToken();

    messaging().onMessage(async remoteMessage => {
      if (remoteMessage.data.type == "more") {
        // Linking.openURL(remoteMessage.data.link)
        // navigation.navigate("HomeScreen", { paramLink: remoteMessage.data.link, paramName: "More Games" })
        navigation.navigate("HomeScreen");
      }
      console.log("remoteMessage : ", remoteMessage.data);
      //   Show notification in Alert box
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });


    messaging().setBackgroundMessageHandler(async remoteMessage => {
      if (remoteMessage.data.type == "more") {
        // Linking.openURL(remoteMessage.data.link)
        // navigation.navigate("HomeScreen", { paramLink: remoteMessage.data.link, paramName: "More Games" })
        navigation.navigate("HomeScreen");
      }
      console.log('Message handled in the background!', remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage.data.type == "more") {
        // Linking.openURL(remoteMessage.data.link)
        // navigation.navigate("WebViewPage", { paramLink: Platform.OS == "android" ? link : link, paramName: "More Games" })
        // navigation.navigate("WebViewPage", { paramLink: Platform.OS == "android" ? 'https://www.alakmalak.com/alakmalak.co.in/alakmalakapps/other_app.html' : 'https://www.alakmalak.com/alakmalak.co.in/alakmalakapps/ios_app.html', paramName: "More Games" })
      }
      console.log('Notification caused app to open from background state:', remoteMessage.notification,);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // console.log(
          //   'Notification caused app to open from quit state:',
          //   remoteMessage.notification,
          // );

          // Linking.openURL(remoteMessage.data.link)
          // navigation.navigate("HomeScreen", { paramLink: remoteMessage.data.link, paramName: "More Games" })
          navigation.navigate("HomeScreen");
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }

      });

  }, []);

  const initFirebase = async () => {
    await firebase.initializeApp(credentials);
  }

  async function getToken() {
    if (Platform.OS == "android") {
      await messaging().registerDeviceForRemoteMessages();
    }
    const token = await messaging().getToken();

    saveSession(FCM_TOKEN, token);
    console.log("Token is : " + JSON.stringify(token, 2, null));

  }


  useEffect(() => {
    if (Platform.OS == "android") [
      requestNotificationPermission()
    ]
  }, []);

  const requestNotificationPermission = async () => {
    try {
      PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS]
      ).then((result) => {
        if (result['android.permission.POST_NOTIFICATIONS'] === 'granted') {
          // console.log("Granted");
        }
      });
    } catch (err) {
      // console.warn(err);
    }
  };

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

var user_id;

function App() {

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const HomeStack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  // tabs method
  function MyTabs() {
    return (
      <View style={externalStyles.topTabsView}>
        <Tab.Navigator initialRouteName='HomeScreen1' backBehavior='initialRoute'
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
            // component={LeaderBoardScreen}
            options={{
              tabBarIcon: ({ color }) => <Image source={images.bottom_tab_home} style={externalStyles.topTabsBarIcon} />,
            }}>
            {() => (
              <HomeStack.Navigator screenOptions={{
                headerShown: false,
              }} initialRouteName='LeaderBoardScreen1'>
                <HomeStack.Screen name="LeaderBoardScreen1" component={LeaderBoardScreen} />
                <HomeStack.Screen name="ConsistResultsScreen" component={ConsistResultsScreen} />
                <HomeStack.Screen name="PerformanceResultsScreen" component={PerformanceResultsScreen} />
              </HomeStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen name="HomeScreen1" component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <View style={externalStyles.middleTabItem}>
                  <Image source={images.drawer_quiz} style={externalStyles.topTabsBarIconMiddle} />
                </View>
              ),
            }} />
          <Tab.Screen name="MyProfileScreen" component={MyProfileScreen}
            options={{
              tabBarIcon: ({ color }) => <Image source={images.fill_user} style={externalStyles.topTabsBarIcon} />,
            }} />
        </Tab.Navigator>
      </View>
    );
  }

  // drawer method
  function MyDrawer() {
    return (
      <Drawer.Navigator screenOptions={{
        headerShown: false
      }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={MyTabs} />
        <Drawer.Screen name="MyResultsScreen" component={MyResultsScreen} />
        {/* <Drawer.Screen name="ConsistResultsScreen" component={ConsistResultsScreen} />
        <Drawer.Screen name="PerformanceResultsScreen" component={PerformanceResultsScreen} /> */}

      </Drawer.Navigator>
    );
  }

  // custom drawer navigation
  function CustomDrawerContent(props) {

    const focused = useIsFocused();
    const [user_name, setUserName] = useState("");
    const [user_email, setUserEmail] = useState("");
    const [user_phone, setUserPhone] = useState("");
    const [designation, setDesignation] = useState("");
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState("");

    React.useEffect(() => {
      if (focused) {
        getProfile();
      }
    }, [focused]);

    // profile api call
    const getProfile = async () => {
      try {
        setLoading(true);

        const token = await getSession(TOKEN);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token.split('|')[1].trim());

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };

        fetch(GET_PROFILE, requestOptions)
          .then((response) => response.json())
          .then((json) => {
            CustomConsole(json);

            if (json.status == 1) {
              // success response

              setUserName(json.data.user_name);
              setUserEmail(json.data.user_email);
              setUserPhone(json.data.user_phone);
              setDesignation(json.data.designation);
              setAvatar(json.data.avatar);

            }
            else {
              // other reponse status
              setLoading(false);
            }

          })
          .catch((error) => {
            setLoading(false);
            CustomConsole("Profile Api Error: " + error);
          });
      } catch (error) {
        setLoading(false);
        CustomConsole("Profile Api Exception: " + error);
      }
    }

    // logout function
    const logoutFunction = async () => {
      Alert.alert(APP_NAME, 'Are you sure you want to log out?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES', onPress: () => {
            clearAsyncStorage()
            props.navigation.navigate("LoginScreen")
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            });
          }
        },
      ]);
    }

    return (
      <>
        <DrawerContentScrollView {...props} style={externalStyles.drawerContentScrollViewstyle}>
          <View style={{}}>
            {/* profile image and details screen */}
            <View style={externalStyles.drawerProfileMainView}>
              <Image style={externalStyles.drawerProfileImage} source={{ uri: avatar }} />
              <Text style={externalStyles.drawerProfileUserName}>{user_name}</Text>
              <Text style={externalStyles.drawerProfileDesignation}>{designation}</Text>
            </View>
            {/* end of profile image and details screen */}
            {/* drawer items view */}
            <View>
              <Pressable style={externalStyles.drawerItemContainer} onPress={() => props.navigation.navigate('Home', { screen: 'HomeScreen1' })}>
                <View style={externalStyles.drawerItemSubContainer}>
                  <View style={{}}>
                    <Image source={images.drawer_quiz}
                      style={externalStyles.drawerItemIcon} resizeMode="contain" />
                  </View>
                  <Text style={externalStyles.drawerItemText}>Active quiz</Text>
                </View>
              </Pressable>
              <Pressable style={externalStyles.drawerItemContainer} onPress={() => props.navigation.navigate("Home", {
                screen: 'LeaderBoardScreen',
                params: {
                  screen: 'LeaderBoardScreen1'
                }
              })}>
                <View style={externalStyles.drawerItemSubContainer}>
                  <View style={{}}>
                    <Image source={images.drawer_leaderboard}
                      style={externalStyles.drawerItemIcon} resizeMode="contain" />
                  </View>
                  <Text style={externalStyles.drawerItemText}>LeaderBoard</Text>
                </View>
              </Pressable>

              <Pressable style={externalStyles.drawerItemContainer} onPress={() => props.navigation.navigate("MyResultsScreen")}>
                <View style={externalStyles.drawerItemSubContainer}>
                  <View style={{}}>
                    <Image source={images.drawer_result}
                      style={externalStyles.drawerItemIcon} resizeMode="contain" />
                  </View>
                  <Text style={externalStyles.drawerItemText}>My Results</Text>
                </View>
              </Pressable>

              <Pressable style={externalStyles.drawerItemContainer} onPress={() => props.navigation.navigate("Home", {
                screen: 'LeaderBoardScreen',
                params: {
                  screen: 'ConsistResultsScreen'
                }
              })}>
                <View style={externalStyles.drawerItemSubContainer}>
                  <View style={{}}>
                    <Image source={images.consistent_icon}
                      style={externalStyles.drawerItemIcon} resizeMode="contain" />
                  </View>
                  <Text style={externalStyles.drawerItemText}>Consistency wise Results</Text>
                </View>
              </Pressable>

              <Pressable style={externalStyles.drawerItemContainer} onPress={() => props.navigation.navigate("Home", {
                screen: 'LeaderBoardScreen',
                params: {
                  screen: 'PerformanceResultsScreen'
                }
              })}>
                <View style={externalStyles.drawerItemSubContainer}>
                  <View style={{}}>
                    <Image source={images.performace_icon}
                      style={externalStyles.drawerItemIcon} resizeMode="contain" />
                  </View>
                  <Text style={externalStyles.drawerItemText}>Performance wise Results</Text>
                </View>
              </Pressable>
              {/* <Pressable style={externalStyles.drawerItemContainer} onPress={() => props.navigation.navigate("MyProfileScreen")}>
                <View style={externalStyles.drawerItemSubContainer}>
                  <View style={{}}>
                    <Image source={images.drawer_user}
                      style={externalStyles.drawerItemIcon} resizeMode="contain" />
                  </View>
                  <Text style={externalStyles.drawerItemText}>My Profile</Text>
                </View>
              </Pressable> */}
              <Pressable style={externalStyles.drawerItemContainer} onPress={() => props.navigation.navigate("FeedbackFormScreen")}>
                <View style={externalStyles.drawerItemSubContainer}>
                  <View style={{}}>
                    <Image source={images.feedback_icon}
                      style={externalStyles.drawerItemIcon} resizeMode="contain" />
                  </View>
                  <Text style={externalStyles.drawerItemText}>Feedback</Text>
                </View>
              </Pressable>
              <Pressable style={externalStyles.drawerItemContainer} onPress={() => props.navigation.navigate("CommonWeb")}>
                <View style={externalStyles.drawerItemSubContainer}>
                  <View style={{}}>
                    <Image source={images.drawer_privacy}
                      style={externalStyles.drawerItemIcon} resizeMode="contain" />
                  </View>
                  <Text style={externalStyles.drawerItemText}>Privacy Policy</Text>
                </View>
              </Pressable>
              <Pressable style={externalStyles.drawerItemContainer} onPress={() => logoutFunction()}>
                <View style={externalStyles.drawerItemSubContainer}>
                  <View style={{}}>
                    <Image source={images.drawer_logout}
                      style={externalStyles.drawerItemIcon} resizeMode="contain" />
                  </View>
                  <Text style={externalStyles.drawerItemText}>Log Out</Text>
                </View>
              </Pressable>
            </View>
            {/* end of drawer items view */}
          </View>
        </DrawerContentScrollView>
      </>
    );
  }

  return (
    <SafeAreaView style={externalStyles.safeAreaViewContainer}>
      <StatusBar
        barStyle={'light-content'}
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
          <Stack.Screen name="HomeScreen" component={MyDrawer} />
          <Stack.Screen name="QuizScreen" component={QuizScreen} />
          {/* <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} /> */}
          {/* <Stack.Screen name="QuizScreen" component={QuizScreen2} /> */}
          <Stack.Screen name="FeedbackFormScreen" component={FeedbackFormScreen} />
          <Stack.Screen name="QuizResultScreen" component={QuizResultScreen} />
          <Stack.Screen name="CommonWeb" component={CommonWeb} />
          {/* <Stack.Screen name="MyResultsScreen" component={MyResultsScreen} /> */}
          <Stack.Screen name="AvatarUpdateScreen" component={AvatarUpdateScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
