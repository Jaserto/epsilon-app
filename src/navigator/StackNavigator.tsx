import React, { useContext, useEffect, useState } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* import sp from 'synchronized-promise'
 */
import { Tabs } from './Tabs';
import Welcome from '../screens/Welcome';
import {InicioScreen} from '../screens/InicioScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { AnalysisScreen } from '../screens/AnalysisScreen';
import { AddWorkoutScreen } from '../screens/AddWorkout';
import { WorkoutScreen } from '../screens/WorkoutScreen';
import { AddExerciseScreen } from '../screens/AddExerciseScreen';
import { ExerciseScreen } from '../screens/ExerciseScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import newPr from '../screens/newPr';

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState<boolean |any>(null)



useEffect( () => {
  async function firstLaunch() {
     await AsyncStorage.getItem('isAppFirstLaunched').then((result:any) => {
      console.log('Appadata',result)
      if(result == null){
        setIsAppFirstLaunched(true)
        /* AsyncStorage.setItem('isAppFirstLaunched', 'false') */
      }else{
        setIsAppFirstLaunched(false)
      }
    })
  }
  firstLaunch()

},[])

  
  return (

    isAppFirstLaunched != null && (
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        <>
          {
            isAppFirstLaunched && ( <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} /> )
          }
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="InicioScreen" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="Analysis" component={AnalysisScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddWorkout" component={AddWorkoutScreen}  />
            <Stack.Screen name="Workout" component={WorkoutScreen}/>
            <Stack.Screen name="AddExerciseScreen" component={AddExerciseScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ExerciseScreen" component={ExerciseScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="newPr" component={newPr} options={{ headerShown: false }}/>
        </>
    </Stack.Navigator>
    )
    
  );
}

