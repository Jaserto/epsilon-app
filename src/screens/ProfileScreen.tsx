import React, { useEffect, useState } from 'react'

import { Dimensions, View, Text, ScrollView, Platform, StyleSheet, Alert, RefreshControl } from 'react-native'

import 'react-native-get-random-values'
const { width, height } = Dimensions.get("window");


export const ProfileScreen = ({ navigation }: any) => {
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
            <View style={{ marginTop: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 35, height: 35, backgroundColor: 'gray', borderRadius: 50, marginRight: 6 }}></View>
                    <View>
                        <Text style={{ color: 'white', fontWeight:'bold' }}>Javier</Text>
                        <Text style={{ color: 'white' }}>5 Entrenamientos</Text>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={{ color: 'white', marginBottom:8 }}>PANEL DE CONTROL</Text>
                <View style={{width:'100%', borderWidth:1, borderColor:'white', borderRadius:4, paddingHorizontal:10, paddingVertical:5}}>
                    <Text style={{ color: 'white' }}>Entrenamientos por semana</Text>
                    <Text style={{ color: 'white' }}>GRAFICA</Text>
                </View>
                <View style={{width:'100%', borderWidth:1, borderColor:'white', borderRadius:4, paddingHorizontal:10, paddingVertical:5}}>
                    <Text style={{ color: 'white' }}>Calorías esta semana</Text>
                    <Text style={{ color: 'white' }}>GRAFICA</Text>
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
    text: {
        fontSize: 15,
        color: 'white',
        marginBottom: 10
    },


})



