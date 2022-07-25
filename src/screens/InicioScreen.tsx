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
<Svg
                            width={30}
                            height={30}
                            viewBox="0 0 30 30"
                            fill="none"
                            stroke="white"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <Path  d="M90.92,35.41v1.44a8.12,8.12,0,0,1-1.19,4.32,6.48,6.48,0,0,1-3.51,2.76l-2.57.88-2.79,1q-1.35.47-2.35,0.85t-1.25.44l-0.63.34a3,3,0,0,0-.75.66,4.88,4.88,0,0,0-.66,1,2.91,2.91,0,0,0-.28,1.32v9.15H69.61V21.12a7,7,0,0,1,2.6-5.36q2.54-2.16,8.05-2.16a17.12,17.12,0,0,1,4.83.6,9.88,9.88,0,0,1,3.32,1.63,6.19,6.19,0,0,1,1.91,2.41,7.36,7.36,0,0,1,.6,2.95V35.41Zm-5.27-13a5.69,5.69,0,0,0-.34-1.57,3.48,3.48,0,0,0-.88-1.32,4,4,0,0,0-1.63-.88,8.87,8.87,0,0,0-2.54-.31,8.36,8.36,0,0,0-2.6.34,4.32,4.32,0,0,0-1.63.91,3.3,3.3,0,0,0-.85,1.22,3.75,3.75,0,0,0-.25,1.35V43.49a1.45,1.45,0,0,1,.6-1,3.12,3.12,0,0,1,1-.44q1-.31,2.07-0.72t2-.72q1.13-.38,2.13-0.75a5.46,5.46,0,0,0,1.5-.88,4.9,4.9,0,0,0,1-1.28,4,4,0,0,0,.44-2V22.37Z" />
                            <Path d="M109.19,19.58Q108.1,18.3,105,18.3a8.36,8.36,0,0,0-2.6.34,4.65,4.65,0,0,0-1.66.91,3.17,3.17,0,0,0-.88,1.22,3.59,3.59,0,0,0-.25,1.28v1.19a2.91,2.91,0,0,0,.28,1.32,4.88,4.88,0,0,0,.66,1,2.78,2.78,0,0,0,.78.66L102,26.57q0.25,0.06,1.25.44t2.35,0.85l2.79,1,2.57,0.88a6.65,6.65,0,0,1,3.48,2.76,8,8,0,0,1,1.22,4.32v2.95a8.62,8.62,0,0,1-.41,2.48,5.68,5.68,0,0,1-1.6,2.48,9.31,9.31,0,0,1-3.26,1.88,19.69,19.69,0,0,1-10.78,0,9.3,9.3,0,0,1-3.26-1.88,5.66,5.66,0,0,1-1.6-2.48,8.59,8.59,0,0,1-.41-2.48V37.92h5.26a4.94,4.94,0,0,0,1.13,3.48q1.13,1.22,4.26,1.22t4.2-1.16a4.9,4.9,0,0,0,1.13-3.54,4,4,0,0,0-.44-2,4.93,4.93,0,0,0-1-1.28,5.48,5.48,0,0,0-1.5-.88q-1.88-.69-3.51-1.25l-2.79-1q-1.35-.47-2-0.66a9.58,9.58,0,0,1-1.44-.75,7.47,7.47,0,0,1-1.57-1.32,6.91,6.91,0,0,1-1.25-2,6.65,6.65,0,0,1-.5-2.66v-3a6.79,6.79,0,0,1,2.57-5.42Q99.45,13.6,105,13.6a17.12,17.12,0,0,1,4.83.6,9.88,9.88,0,0,1,3.32,1.63A6.19,6.19,0,0,1,115,18.23a7.36,7.36,0,0,1,.6,2.95v1.5h-5.33A4.62,4.62,0,0,0,109.19,19.58Z"  />
                            <Path d="M125,1.44V7.77h-5.27V1.44H125ZM119.75,14.1H125V46.82h-5.27V14.1Z"  />
                            <Path d="M130,1.37h5.26V46.82H130V1.37Z"  />
                            <Path  d="M160,38.73v1a10.84,10.84,0,0,1-.25,2,5.63,5.63,0,0,1-1.32,2.51,8.48,8.48,0,0,1-3.2,2.16,19.55,19.55,0,0,1-11.78,0,8.46,8.46,0,0,1-3.2-2.16,5.6,5.6,0,0,1-1.32-2.54,11.09,11.09,0,0,1-.25-2V21.18a11.11,11.11,0,0,1,.25-2,5.61,5.61,0,0,1,1.32-2.54,8.49,8.49,0,0,1,3.2-2.16,19.55,19.55,0,0,1,11.78,0,8.5,8.5,0,0,1,3.2,2.16,5.64,5.64,0,0,1,1.32,2.51,10.85,10.85,0,0,1,.25,2V38.73Zm-5.33-.63v-16a4.47,4.47,0,0,0-.19-1.22,2.72,2.72,0,0,0-.78-1.22,5,5,0,0,0-1.66-1,8.3,8.3,0,0,0-2.88-.41,7.58,7.58,0,0,0-2.73.41,4.39,4.39,0,0,0-1.6,1A2.75,2.75,0,0,0,144.1,21a5.47,5.47,0,0,0-.16,1.19V38.73a5.45,5.45,0,0,0,.16,1.19,2.74,2.74,0,0,0,.72,1.28,4.36,4.36,0,0,0,1.6,1,7.56,7.56,0,0,0,2.73.41,8.27,8.27,0,0,0,2.88-.41,5,5,0,0,0,1.66-1,2.72,2.72,0,0,0,.78-1.22,4.47,4.47,0,0,0,.19-1.22V38.1Z"  />
                            <Path  d="M184.75,46.82h-5.33V22.18a5.33,5.33,0,0,0-.16-1.22,2.77,2.77,0,0,0-.72-1.25,4.39,4.39,0,0,0-1.6-1,7.58,7.58,0,0,0-2.73-.41,8.34,8.34,0,0,0-2.85.41,5,5,0,0,0-1.69,1,2.71,2.71,0,0,0-.78,1.22,4.28,4.28,0,0,0-.19,1.16V46.82h-5.33V21.18a10.75,10.75,0,0,1,.25-2A5.5,5.5,0,0,1,165,16.67a8.8,8.8,0,0,1,3.23-2.16,19.55,19.55,0,0,1,11.78,0,8.5,8.5,0,0,1,3.2,2.16,5.63,5.63,0,0,1,1.32,2.54,11.22,11.22,0,0,1,.25,2V46.82Z"  />
                            <Path  d="M67,36.67v0.6c0,0.72-.72,7.48-0.8,8.55A1.49,1.49,0,0,1,64.61,47H37.71a1.93,1.93,0,0,1-1.8-1.12,1.65,1.65,0,0,1,.38-2.1c0.4-.37,7.52-8,10.57-11.27,0.78-.83,1.37-1.49,1.6-1.73-1.71-1.9-12.12-13.56-12.16-14.12s0-.94,0-1.4V14H64v8H61.07L60.8,20.93c-0.14-.7-0.26-1.21-0.44-1.91a9.44,9.44,0,0,0-.44-1.13,2.2,2.2,0,0,0-.14-0.25l-14.51,0c1.91,2.2,7.09,8.3,8.66,10.3a4.23,4.23,0,0,1,.55.83,1.19,1.19,0,0,1,0,1,3.3,3.3,0,0,1-.6.77C52,32.86,46.48,39,43.94,41H61.7a16.35,16.35,0,0,1,1-2.61l0.25-.61c0.51-1.38,1.93-1.35,3.22-1.2Z"  />
                        </Svg>

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




