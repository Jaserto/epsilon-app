import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Platform, RefreshControl, StyleSheet, Text, View } from 'react-native'
import {  ScrollView } from 'react-native-gesture-handler'


import { exercises } from '../utils/exercices/data';

const { width, height } = Dimensions.get("window");


export const trackingScreen = ({ navigation }: any) => {


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




