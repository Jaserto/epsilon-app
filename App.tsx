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
import { WorkoutProvider } from './src/context/WorkoutContext/WorkoutContext';



const AppState = ({ children }: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <WorkoutProvider>
      {children}
    </WorkoutProvider>
  )
}



const App = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
LogBox.ignoreLogs([
  "Require cycle: node_modules/victory",
]);

  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator /> 
       </AppState>


  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
