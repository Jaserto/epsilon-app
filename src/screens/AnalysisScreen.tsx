import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Alert, Button, Dimensions, Image, LogBox, Platform, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

import 'react-native-get-random-values'

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




