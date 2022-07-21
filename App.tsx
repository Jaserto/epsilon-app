/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';



const App = () => {
  return (
    <SafeAreaView style={{backgroundColor:'red', display:'flex', flex:1, height:70, width:70}}>
      <Text>Hola</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
