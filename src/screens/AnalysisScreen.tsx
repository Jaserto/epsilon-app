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


export const AnalysisScreen = ({ navigation }: any) => {


   // const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
    const POINTS = 70
 
    const [points, setPoints] = useState(() => generateRandomGraphData(POINTS))
    const [enablePanGesture, setEnablePanGesture] = useState(true)
    const [isAnimated, setIsAnimated] = useState(true)
    const [enableFadeInEffect, setEnableFadeInEffect] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const colors = useColors()

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

    const refreshData = useCallback(() => {
        setPoints(generateRandomGraphData(POINTS))
        hapticFeedback('impactLight')
      }, [])

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
            <Text style={{color:'white', fontSize:25, fontWeight:'bold'}}>Ejercicios</Text>
           </View>
          {exercises.map(({id, nombre, muscularGroup}) => (
            <View key={id}>
                <View style={{marginVertical:10, flexDirection:'row', alignItems:'center'}}>
                    <View style={{width:33, height:33, borderRadius:100, backgroundColor:'gray', marginRight:10}}></View>
                    <View>
                        <Text style={{color:'white', fontWeight:'bold', fontSize:16}}>{nombre}</Text>
                        <Text style={{color:'white', fontSize:14}}>{muscularGroup}</Text>
                    </View>

                </View>
            </View>
          ))}
           <View>
            
               
           </View>
        
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



