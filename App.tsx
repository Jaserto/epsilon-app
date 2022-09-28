/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator';
import SplashScreen from 'react-native-splash-screen'

import {
  StyleSheet
} from 'react-native';

import { LogBox } from 'react-native';
import { WorkoutProvider } from './src/context/WorkoutContext/WorkoutContext';
import { UserProvider } from './src/context/UserContext/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AppState = ({ children }: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <UserProvider>
      <WorkoutProvider>
        {children}
      </WorkoutProvider>
    </UserProvider>
  )
}

const App = () => {

  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  LogBox.ignoreLogs([
    "Require cycle: node_modules/victory",
  ]);
  LogBox.ignoreLogs(['Invalid prop textStyle of type array supplied to Cell']);

  useEffect(()=> {  
    SplashScreen.hide()
  },[])

  



  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator  /> 
       </AppState>


  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
