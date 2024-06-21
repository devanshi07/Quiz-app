/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
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
import { TOKEN, USER_ID, clearAsyncStorage, getSession } from './common/LocalStorage';
import MyProfileScreen from './screens/MyProfileScreen';
import QuizScreen2 from './screens/QuizScreen2';
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import MyResultsScreen from './screens/MyResultsScreen';
import { APP_NAME } from './common/string';
import { GET_PROFILE } from './common/webUtils';
import { CustomConsole, getPopBoldFont, getPopRegularFont, getPopSemiBoldFont } from './common/utils';
import CommonWeb from './screens/CommonWeb';

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
          <Tab.Screen name="LeaderBoardScreen" component={LeaderBoardScreen}
            options={{
              tabBarIcon: ({ color }) => <Image source={images.bottom_tab_home} style={externalStyles.topTabsBarIcon} />,
            }} />
          <Tab.Screen name="HomeScreen1" component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <View style={externalStyles.middleTabItem}>
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

  // drawer method
  function MyDrawer() {
    return (
      <Drawer.Navigator screenOptions={{
        headerShown: false
      }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={MyTabs} />
        <Drawer.Screen name="MyProfileScreen" component={MyProfileScreen} />
        <Drawer.Screen name="MyResultsScreen" component={MyResultsScreen} />
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
              <Pressable style={externalStyles.drawerItemContainer} onPress={() => props.navigation.navigate("Home", { screen: 'LeaderBoardScreen' })}>
                <View style={externalStyles.drawerItemSubContainer}>
                  <View style={{}}>
                    <Image source={images.drawer_leaderboard}
                      style={externalStyles.drawerItemIcon} resizeMode="contain" />
                  </View>
                  <Text style={externalStyles.drawerItemText}>LeaderBoard</Text>
                </View>
              </Pressable>
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
              <Pressable style={externalStyles.drawerItemContainer} onPress={() => props.navigation.navigate("MyProfile")}>
                <View style={externalStyles.drawerItemSubContainer}>
                  <View style={{}}>
                    <Image source={images.drawer_user}
                      style={externalStyles.drawerItemIcon} resizeMode="contain" />
                  </View>
                  <Text style={externalStyles.drawerItemText}>My Profile</Text>
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
          {/* <Stack.Screen name="QuizScreen" component={QuizScreen2} /> */}
          <Stack.Screen name="FeedbackFormScreen" component={FeedbackFormScreen} />
          <Stack.Screen name="QuizResultScreen" component={QuizResultScreen} />
          <Stack.Screen name="CommonWeb" component={CommonWeb} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
