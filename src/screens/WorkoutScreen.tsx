import React, { useEffect, useState } from 'react'
import { Alert, Button, Dimensions, Platform, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Path, Svg, Circle, Line, Polyline } from 'react-native-svg';
import 'react-native-get-random-values'
import { Series } from '../utils/models/Series';
import { Exercise } from '../utils/models/Exercise';
import { Workout } from '../utils/models/Workout';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get("window");


export const WorkoutScreen = (props: any) => {



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
                tintColor={"#111111"}
                colors={["#111111"]}
                refreshing={isLoading}
                onRefresh={onRefresh}
            />
        );
    };

    const getExercises = (exercises: any) => {
        /*  console.log('------------------------------------')
         console.log(exercises.series, 'series') */
        return exercises.map((exercise: Series, index: number) => (
            <View key={exercise.id} style={{ borderColor: 'white', borderWidth: 1, marginBottom: 5, display: 'flex', flexDirection: 'column', borderRadius: 5, paddingHorizontal: 10, paddingVertical:4 }}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginBottom: 6 }}>{/* {exercise.series.length} */}{exercise.exercise}</Text>
                <View style={{ marginBottom: 3 }}>

                    {/*          Arreglar problema index        */}
                    {exercise.series.map((serie, index: number) => (
                        <View key={index}>
                            <Text style={{ color: 'white' }}>{index + 1}   {serie.reps} x {serie.weight}kg</Text>
                        </View>
                    ))}
                </View>

            </View>

        ));
    }

    const getBestSeries = (exercises: any) => {

        return exercises.map((exercise: any, index: number) => (
            <View key={exercise.id} style={{ borderColor: 'purple', borderWidth: 1, display: 'flex', flexDirection: 'column', marginTop: 3, borderRadius: 5, padding: 3 }}>
                {
                    <Text style={{ color: 'purple' }}>{Math.max(...exercise.series.map((serie: any) => serie.weight))} kg x {exercise.series[0].reps} </Text>
                }
            </View>

        ));
    }


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
            <View style={{ justifyContent: 'space-between', height: '100%', marginBottom: 40 }}>
                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => { props.navigation.pop() }}>
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
                    <View style={{display:'flex', flexDirection:'row'}}>
                        <Svg
                            width={25}
                            height={25}
                            viewBox="0 0 25 25"
                            stroke="white"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <Circle cx="18" cy="5" r="3" />
                            <Circle cx="6" cy="12" r="3" />
                            <Circle cx="18" cy="19" r="3" />
                            <Line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                            <Line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </Svg>
                        <Svg
                            width={25}
                            height={25}
                            viewBox="0 0 25 25"
                            stroke="white"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <Circle cx="12" cy="12" r="1"/>
                            <Circle cx="12" cy="5" r="1" />
                            <Circle cx="12" cy="19" r="1" />
                        </Svg>
                    </View>


                </View>


                <View>


                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>{props.route.params.title}</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'white', fontSize: 16 }}>{props.route.params.fecha}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, width: '100%' }}>
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Svg
                                width={15}
                                height={15}
                                viewBox="0 0 25 25"
                                stroke="white"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <Circle cx="12" cy="12" r="10" />
                                <Polyline points="12 6 12 12 16 14" />
                            </Svg>

                            <Text style={{ textAlign: 'center', marginLeft: 5, color: 'white' }}>{props.route.params.time}</Text>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                            <Svg
                                width={15}
                                height={15}
                                viewBox="0 0 25 25"
                                fill="white"
                                stroke="white"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <Line x1="12" y1="5" x2="12" y2="19" />
                                <Line x1="5" y1="12" x2="19" y2="12" />
                                <Line x1="5" y1="12" x2="19" y2="12" />
                            </Svg>
                            <Text style={{ textAlign: 'center', marginLeft: 5, color: 'white' }}>{props.route.params.totalWeight} Kg</Text>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                            <Svg
                                width={15}
                                height={15}
                                viewBox="0 0 25 25"
                                fill="white"
                                stroke="white"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <Polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                <Polyline points="17 6 23 6 23 12" />
                            </Svg>
                            <Text style={{ textAlign: 'right', marginLeft: 5, color: 'white' }}>{props.route.params.pr} PRs</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 15 }}>

                        <Text style={{ textAlign: 'center', marginLeft: 5, color: 'white' }}>{props.route.params.notes}</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'white' }}>{props.route.params.exercises}</Text>

                        {getExercises(props.route.params.series)}
                    </View>

                </View>

                <TouchableOpacity
                >
                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#673ab7', '#512da8']} style={styles.linearGradient}>
                        <Text style={styles.buttonText}>
                            Realizar de nuevo
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
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
        padding: 15,
    },
    linearGradient: {
        marginVertical: 6,
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 6
    },
    buttonText: {
        fontSize: 14,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },


})


