import React, { useContext, useEffect, useState } from 'react'
import { Alert, Dimensions, Image, LogBox, Platform, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import * as Keychain from "react-native-keychain";
import { Path, Svg, Circle, Line } from 'react-native-svg';
import CalendarStrip from 'react-native-calendar-strip';
import 'react-native-get-random-values'
import { customAlphabet } from 'nanoid/non-secure';

const { width, height } = Dimensions.get("window");


export const InicioScreen = ({ navigation }: any) => {


    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

    const data = [
        {
            id: 9,
            dia: 20,
            mes: 7,
            exercise: 'Barbell Squat',
            series: [
                {
                    id: 12304,
                    reps: 5,
                    weight: 90
                },
                {
                    id: 12305,
                    reps: 5,
                    weight: 90
                },
                {
                    id: 1234,
                    reps: 5,
                    weight: 90
                }
            ]
        },
        {
            id: 1222,
            dia: 20,
            mes: 7,
            exercise: 'Bench Press',
            series: [
                {
                    id: 3444,
                    reps: 5,
                    weight: 80
                },
                {
                    id: 334,
                    reps: 5,
                    weight: 80
                },
                {
                    id: 1231,
                    reps: 5,
                    weight: 80
                }
            ],
            
        },
        {
            dia: 22,
            mes: 7,
            exercise: 'Barbell Squat',
            series: [
                {
                    id: 123059,
                    reps: 5,
                    weight: 90
                },
                {
                    id: 12111,
                    reps: 5,
                    weight: 90
                },
                {
                    id: 1211,
                    reps: 5,
                    weight: 90
                }
            ]
        }
    ]
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
            {/*  <Text style={styles.textHeader}>Inicio</Text>  */}
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        style={{ width: 32, height: 32, borderRadius: 50, marginRight: 12 }}
                        source={require('../assets/images/logo2.png')}
                        />

                </View>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
                <View style={{ display: 'flex', alignItems: 'center', marginRight:10}}>
                    <TouchableOpacity
                        onPress={() => {
                        }}>
                        <Svg
                            width={30}
                            height={30}
                            viewBox="0 0 30 30"
                            fill="white"
                            stroke="white"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round">
                                <Line x1="12" y1="5" x2="12" y2="19"/>
                                <Line x1="5" y1="12" x2="19" y2="12" />
                                <Line x1="5" y1="12" x2="19" y2="12" />
                        </Svg>
                    </TouchableOpacity>
                </View>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Svg
                            width={30}
                            height={30}
                            viewBox="0 0 30 30"
                            fill="none"
                            stroke="white"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </Svg>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <CalendarStrip
                    scrollable
                    style={{ height: 80, paddingTop: 20, paddingBottom: 10 }}
                    calendarColor={'#181818'}
                    calendarHeaderStyle={{ color: 'white' }}
                    dateNumberStyle={{ color: 'white' }}
                    dateNameStyle={{color: 'white'}}
                    iconContainer={{ flex: 0.1 }}
                    iconStyle={{ tintColor: 'white'}}
                />
            </View>
            <View style={{marginTop:10}}>
                <Text style={styles.h3}>Entrenamientos del día</Text>
            </View>
            <View>
                {   data.map((workout) => (
                        <View key={workout.id} 
                            style={{backgroundColor:'#FFEA75', width:'100%', 
                            marginBottom:10, borderRadius:5, paddingHorizontal:15, paddingVertical:6}}>
                            <Text style={{fontWeight:'bold', marginBottom:5}}>{workout.exercise}</Text>
                           {/*  <View
                                style={{
                                width:'100%',
                                borderBottomColor: '#181818',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                }}
                            /> */}
                            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:10}}>
                               <Text>{workout.dia}</Text> 
                               <Text>{workout.series[0].weight} KG</Text> 
                               <Text>Reps:{workout.series[0].reps}</Text> 
                               <View>
                                <Image 
                                     style={{ tintColor:'#181818', width: 32, height: 32, borderRadius: 50, marginRight: 12 }}
                                     source={require('../assets/images/more.png')}
                                />
                                </View>
                            </View>
                        </View>
                    ))
                }
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
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
        borderBottomRightRadius: 25
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },

})




