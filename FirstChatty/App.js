import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import ChatList from './screens/ChatsList';
import Settings from './screens/Settings';
import Chat from './screens/Chat';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Provider, DefaultTheme } from 'react-native-paper';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';






const firebaseConfig = {
  apiKey: "AIzaSyDBPqwyXmPXWXs5PpGR0gJcDTO5T3Wm6co",
  authDomain: "first-chatty.firebaseapp.com",
  projectId: "first-chatty",
  storageBucket: "first-chatty.appspot.com",
  messagingSenderId: "934835325356",
  appId: "1:934835325356:web:bf24f6885e327f45809209"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();



const Stack = createNativeStackNavigator();


const Tabs = createBottomTabNavigator();


const TabsNavigator = () => {
  const navigation = useNavigation()
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        navigation.navigate('SignUp');
      }
    });

  }, []);
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={route.name == 'ChatList' ? "chatbubbles-outline" : "settings"}
              color={color}
              size={size}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="ChatList" component={ChatList} />
      <Tabs.Screen name="Settings" component={Settings} />

    </Tabs.Navigator>);
};


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196f3',
    accent: '#e91e63',
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={TabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ presentation: 'fullScreenModal' }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ presentation: 'fullScreenModal' }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>

  );
};

export default App;


