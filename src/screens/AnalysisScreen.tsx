import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Platform, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {  ScrollView } from 'react-native-gesture-handler'
import Svg, { Line, Polyline } from 'react-native-svg';


import { exercises } from '../utils/exercices/data';

const { width, height } = Dimensions.get("window");


export const AnalysisScreen = ({ navigation }: any) => {


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
                     <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => {   navigation.navigate('InicioScreen',{}) }}>
                <Svg
                    width={25}
                    height={25}
                    viewBox="0 0 25 25"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <Line x1="19" y1="12" x2="5" y2="12" />
                    <Polyline points="12 19 5 12 12 5" />
                </Svg>
            </TouchableOpacity>
        </View>
           <View  style={{marginVertical:10}}>
            <Text style={{color:'white', fontSize:25, fontWeight:'bold'}}>Ejercicios</Text>
           </View>
          {exercises.map(({id, nombre, muscularGroup, instrucciones}) => (
            <TouchableOpacity 
            onPress={() => {
                navigation.navigate('ExerciseScreen', {
                    id,
                    nombre,
                    muscularGroup,
                    instrucciones
                })
            }}
            key={id}>
                <View style={{marginVertical:10, flexDirection:'row', alignItems:'center'}}>
                    <View style={{width:33, height:33, borderRadius:100, backgroundColor:'gray', marginRight:10}}></View>
                    <View>
                        <Text style={{color:'white', fontWeight:'bold', fontSize:16}}>{nombre}</Text>
                        <Text style={{color:'white', fontSize:14}}>{muscularGroup}</Text>
                    </View>

                </View>
            </TouchableOpacity>
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




