/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator';

import {
  StyleSheet
} from 'react-native';

import { LogBox } from 'react-native';


const App = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
  return (
    <NavigationContainer>

       <StackNavigator /> 

   {/*   <MenuLateral /> */}

  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
