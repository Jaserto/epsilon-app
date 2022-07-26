import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native'
import { InicioScreen } from '../screens/InicioScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { CalculatorRM } from '../screens/CalculatorRM';
import { AnalysisScreen } from '../screens/AnalysisScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import Svg, { Circle, Line, Path, Polyline } from 'react-native-svg'
import { AddWorkoutScreen } from '../screens/AddWorkout';



const Tab = createBottomTabNavigator();


export const Tabs = () => {

    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={({ route }: any) => ({
                tabBarActiveTintColor: '#6B6B6B',
                tabBarInactiveTintColor: '#6B6B6B',
                fontSize: 17,
                tabBarShowLabel: false,
                tabBarStyle: {
                    paddingHorizontal: 10,
                    bottom: 0,
                    height: 45,
                    // Remove border top on both android & ios
                    borderTopWidth: 0,
                    borderTopColor: "transparent",
                    backgroundColor: '#111111',
                    shadowColor: '#000',
                    shadowOpacity: 0.8,
                    shadowOffset: {
                        width: 10,
                        height: 10
                    }
                },
                tabBarIcon: ({ color, focused }) => {
                    let iconImage: string = '';
                    switch (route.name) {
                        case 'Inicio':
                            iconImage = require("../assets/images/inicio.png")
                            break;
                    }
                    return <Image
                        source={iconImage}
                        style={[styles.imagen, focused ? styles.color22 : styles.color22]}
                        resizeMode="cover"

                    />
                }
            })}
        >
            <Tab.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }} />
           
            <Tab.Screen name="Analysis" component={AnalysisScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Svg
                            width={25}
                            height={25}
                            viewBox="0 0 28 28"
                            fill="none"
                            stroke="white"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <Polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></Polyline>
                        </Svg>
                    )
                }} 
            />
                        <Tab.Screen name="AddWorkout" component={AddWorkoutScreen} 
            options={{ 
                headerShown: false,
                tabBarIcon: ({ color }) => (
                    <Svg
                        width={35}
                        height={35}
                        viewBox="0 0 28 28"
                        fill="none"
                        stroke="white"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <Line x1="12" y1="5" x2="12" y2="19"/>
                        <Line  x1="5" y1="12" x2="19" y2="12" />
                    </Svg>
                )
            }} />
             <Tab.Screen name="Settings" component={SettingsScreen}
             options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (
                    <Svg
                        width={25}
                        height={25}
                        viewBox="0 0 27 27"
                        fill="none"
                        stroke="white"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <Circle cx="12" cy="12" r="3" />
                        <Path  d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </Svg>
                )
            }} 
            />
       
            <Tab.Screen name="Calculator" component={CalculatorRM} 
            options={{ 
                headerShown: false,
                tabBarIcon: ({ color }) => (
                    <Svg
                        width={25}
                        height={25}
                        viewBox="0 0 26 26"
                        fill="none"
                        stroke="white"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <Circle cx="12" cy="7" r="4" />
                    </Svg>
                )
            }} />
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    imagen: {
        width: 20,
        height: 17,
    },
    color22: {
        width: 19,
    }

})


