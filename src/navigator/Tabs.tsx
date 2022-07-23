import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Image, StyleSheet } from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import Welcome from '../screens/Welcome';
import { InicioScreen } from '../screens/InicioScreen';

const Tab = createBottomTabNavigator();



export const Tabs = () => {

    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={({ route }: any) => ({
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#D0D0D0',
                fontSize: 17,
                tabBarShowLabel: false,
                tabBarStyle: {
                    marginHorizontal: 17,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    bottom: 10,
                    height: 45,
                    // Remove border top on both android & ios
                    borderTopWidth: 0,
                    borderTopColor: "transparent",
                    backgroundColor: "#46456f",
                    /*  background-color: #42378f;
             background-image: linear-gradient(315deg, #42378f 0%, #f53844 74%); */
                    shadowColor: '#000',
                    shadowOpacity: 0.8,
                    shadowOffset: {
                        width: 10,
                        height: 10
                    }
                },
                tabBarBackground: () => (
                    <LinearGradient colors={['#DB3F3F', '#F71735']} style={{ bottom: 5, height: 50, borderRadius: 10 }} />
                ),
                tabBarIcon: ({ color, focused }) => {
                    let iconName: string = '';
                    let iconImage: string = '';
                    switch (route.name) {
                        case 'Welcome':
                            iconImage = require("../assets/images/logo2.png")
                            break;
                        case 'Inicio':
                            iconImage = require("../assets/images/logo2.png")
                            break;

                    }
                    return <Image
                        source={iconImage}
                        style={[styles.imagen, focused ? styles.color22 : styles.color22]}
                        resizeMode="cover"

                    />
                }
            })}
        /*     tabBarOptions={{
                showIcon:true,
                pressColor: 'cyan',
                style:{ 
                    backgroundColor: 'red'
                },
                 */
        >

            <Tab.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Tab.Screen name="Welcome" component={InicioScreen} options={{ headerShown: false }} />



        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    imagen: {
        width: 17,
        height: 17,
    },
    color22: {
        width: 19,
    }

})


