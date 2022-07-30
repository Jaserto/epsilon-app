import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Alert, Button, Dimensions, Image, LogBox, Platform, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import * as Keychain from "react-native-keychain";
import { Path, Svg, Circle, Line } from 'react-native-svg';
import CalendarStrip from 'react-native-calendar-strip';
import 'react-native-get-random-values'
import { LineGraph } from 'react-native-graph'
import { useColors } from '../hooks/useColors';
import { generateRandomGraphData } from '../data/GraphData';
import { hapticFeedback } from '../utils/HapticFeedback';
import { Canvas, RoundedRect } from '@shopify/react-native-skia';
import { StatusBar, useWindowDimensions } from 'react-native';
import { exercises } from '../utils/exercices/data';

const { width, height } = Dimensions.get("window");


export const WorkoutScreen = ({ navigation }: any) => {



    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
     
    }, [])

    const refreshControl = () => {
        const onRefresh = () => {
            try {

            } catch (e: any) { Alert.alert('Error', e.message) }
        };

        return (
            <RefreshControl
                tintColor={"##181818"}
                colors={["#181818"]}
                refreshing={isLoading}
                onRefresh={onRefresh}
            />
        );
    };

    return (

        <ScrollView
            refreshControl={refreshControl()}
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            contentInset={{ // iOS only
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }}
            contentContainerStyle={{
                paddingRight: Platform.OS === 'android' ? 0 : 0
            }} style={styles.view}>
           <View  style={{marginVertical:10}}>
            <Text style={{color:'white', fontSize:25, fontWeight:'bold'}}>Entrenamiento</Text>
           </View>

           <View>
            
               
           </View>
            <TouchableOpacity>
                <Text style={{color:'white'}}>Añadir ejercicio</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{color:'red'}}>Cancelar entrenamiento</Text>
            </TouchableOpacity>
        </ScrollView>



    )
}
const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#111111',
        height: height,
        width: width,
        padding: 15
    },
  
  
})


