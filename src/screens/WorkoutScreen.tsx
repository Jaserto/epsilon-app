import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Alert, Button, Dimensions, Platform, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import * as Keychain from "react-native-keychain";
import { Path, Svg, Circle, Line, Polyline } from 'react-native-svg';
import CalendarStrip from 'react-native-calendar-strip';
import 'react-native-get-random-values'
import { Series } from '../utils/models/Series';
import { Exercise } from '../utils/models/Exercise';
import { Workout } from '../utils/models/Workout';

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

    const getExercises = (series: any) => {
        console.log(series)
        return series.map((exercise: Series, index:number) => (
            <View key={exercise.id}>
              
                <Text style={{ color: 'white' }}>{index +1}   {exercise.weight} kg x {exercise.reps}</Text>
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
            <View style={{ marginVertical: 20 }}>

                <Text style={{ textAlign: 'center', marginLeft: 5, color: 'white' }}>{props.route.params.notes}</Text>
            </View>
            <View>
            <Text style={{ color: 'white' }}>{props.route.params.exercise}</Text>
            {getExercises(props.route.params.series)}
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


