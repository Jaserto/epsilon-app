
import React, { useContext, useEffect, useState } from 'react'
import { Box, BoxShadow, Canvas, Circle, Image, Fill, Group, Line, rect, RoundedRect, rrect, useImage, vec, ColorMatrix, Blur } from '@shopify/react-native-skia';

import { Alert, LogBox, Platform, Pressable, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar, Dimensions, useWindowDimensions } from 'react-native';
import 'react-native-get-random-values'
import { Wallet } from '../wallet';


export const ProfileScreen = ({ navigation }: any) => {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { width, height } = useWindowDimensions();
    const [isLoading, setIsLoading] = useState<boolean>(false)
        ;
    const center = vec(width / 2, height / 2);


    //  const image = useImage(require("../assets/oslo.jpg"));

    return (
        <View style={{ width, height: '100%', backgroundColor: 'black' }}>
            {/*  <Wallet /> */}
            <Pressable
                onPress={() => navigation.navigate('Wallet' as never)}
            >
                <Text style={{ color: 'white' }}>wallet</Text>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate('Graphs' as never)}
            >
                <Text style={{ color: 'white' }}>graphs</Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('GraphPage' as never)}
            >
                <Text style={{ color: 'white' }}>graph</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
})




