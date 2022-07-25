import React, { useContext, useEffect, useState } from 'react'
import { Alert, Dimensions, Image, LogBox, Platform, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import * as Keychain from "react-native-keychain";
import { Path, Svg, Circle, Line } from 'react-native-svg';
import CalendarStrip from 'react-native-calendar-strip';
import 'react-native-get-random-values'
import { customAlphabet } from 'nanoid/non-secure';

const { width, height } = Dimensions.get("window");


export const SettingsScreen = ({ navigation }: any) => {


    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

    
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
            <Text style={styles.h3}>Ajustes</Text>
            <View>
                <Text style={{color:'white'}}></Text>
                <Text style={{color:'white'}}>Objetivos</Text>
                <Text style={{color:'white'}}>METRICAS</Text>
                <Text style={{color:'white'}}>altura peso, maximos </Text>
                <Text style={{color:'white'}}>Kg o lb</Text>
                
            </View>

        </ScrollView>



    )
}
const styles = StyleSheet.create({

    view: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#181818',
        height: height,
        width: width,
        padding: 15
    },
    imageProd: {
        width: 33,
        height: 33,

    },
    contendorFechaNombre: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cardFecha: {
        display: 'flex',
        alignItems: 'center',
        maxWidth: '40%',
        height: 110,
    },

    textContentFecha: {
        marginBottom: 10,
        backgroundColor: '#fff',
        shadowColor: '#ccc',
        flexDirection: 'row',
        flex: 2,
        borderRadius: 7,
        justifyContent: 'space-between'
    },
    textHeader: {
        fontSize: 30,
        marginBottom: 15
    },
    cardText: {
        fontSize: 10,
    },
    h3: {
        fontSize: 17,
        marginBottom: 18,
        color: 'white'
    },
    card: {
        // padding: 10,
        backgroundColor: '#FFEA75',
        elevation: 2,

        borderRadius: 10,
        marginRight: 10,
        shadowColor: "#000",
        shadowRadius: 10,
        shadowOpacity: 0.8,

        height: 200,
        width: 200,
        overflow: "hidden",
    },
    sendButton: {
        backgroundColor: '#DB3F3F',
        width: 45,
        height: 35,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBox: {
        flexDirection: "row",
        backgroundColor: '#fff',
        alignSelf: 'center',
        width: '85%',
        borderRadius: 20,
        padding: 6,
        paddingHorizontal: 14,
        marginBottom: 15,
        marginTop: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
        borderBottomRightRadius: 25
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    marker: {
        backgroundColor: '#23324F',
        padding: 0,
        borderRadius: 5,
    },
    text: {
        fontSize: 12,
        color: 'white'
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '80%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 30,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    }

})




