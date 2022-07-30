import React, { useContext } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Tabs } from './Tabs';
import Welcome from '../screens/Welcome';
import {InicioScreen} from '../screens/InicioScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { AnalysisScreen } from '../screens/AnalysisScreen';
import { Wallet } from '../wallet/Wallet';
import { Slider } from '../Graphs/Slider';
import { GraphPage } from '../screens/GraphPage';
import { AddWorkoutScreen } from '../screens/AddWorkout';
import { WorkoutScreen } from '../screens/WorkoutScreen';


const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (

    <Stack.Navigator screenOptions={{ headerShown: false}}>
        <>
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="InicioScreen" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="Analysis" component={AnalysisScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddWorkout" component={AddWorkoutScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Workout" component={WorkoutScreen} options={{ headerShown: false }} />
        </>
    </Stack.Navigator>
  );
}

