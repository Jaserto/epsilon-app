import React, { useContext } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Tabs } from './Tabs';
import Welcome from '../screens/Welcome';
import {InicioScreen} from '../screens/InicioScreen';


const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (

    <Stack.Navigator screenOptions={{ headerShown: false}}>
        <>
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }} />
        </>
    </Stack.Navigator>
  );
}

