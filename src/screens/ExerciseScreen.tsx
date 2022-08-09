import { View, Text, ScrollView, Alert, RefreshControl, Platform, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { exercises } from '../utils/exercices/data'

const { width, height } = Dimensions.get("window");

export const ExerciseScreen = (props:any) =>  {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
     console.log(props)
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
            <Text style={{color:'white', fontSize:25, fontWeight:'bold'}}>Descripción</Text>
           </View>
           
           <View style={{marginVertical:7}}>
                <Text style={{color:'white', fontSize:19}}>{props.route.params.nombre}</Text>
                <View style={{ marginVertical:5}}>
                <Text style={{color:'white', fontSize:16}}>Grupo Muscular:</Text>
                <Text style={{color:'white', fontSize:19}}>{props.route.params.muscularGroup}</Text>
                </View>
                 <View style={{ marginVertical:5}}>
                <Text style={{color:'white', fontSize:16, marginVertical:5}}>Intrucciones:</Text>
                <Text style={{color:'white', fontSize:16}}>{props.route.params.instrucciones}</Text>
                </View>
              
               
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




