import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Button, Dimensions, Image, LogBox, Platform, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Path, Svg, Circle, Line, Polyline } from 'react-native-svg';
import CalendarStrip from 'react-native-calendar-strip';
import 'react-native-get-random-values'
import LinearGradient from 'react-native-linear-gradient';
import { Series } from '../utils/models/Series';
import { TooltipMenu } from 'react-native-tooltip-menu';
import { data } from '../utils/tmp/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Workout } from '../utils/models/Workout';
import 'moment';
import 'moment/locale/es';



const { width, height } = Dimensions.get("window");


export const InicioScreen = ({ navigation }: any) => {

    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [workouts, setWorkouts] = useState<Array<Workout>>([])
    const [workoutsFilter, setWorkoutsFilter] = useState<Array<Workout>>([])
    const [dates, setDates] = useState<Array<Date>>([])
    const [day, setDay] = useState<number>(new Date().getDate())
    const [lastWorkouts, setLastWorkouts] = useState<boolean>(true)

      // Marked dates array format

   /*    const markedDatesArray = [
        {
          date: Date.now(),
          dots: [
            {
              color: 'purple',
              selectedColor: 'blue',
            },
          ],
        },
        {
          date: '(string, Date or Moment object)',
          lines: [
            {
              color: 'red',
              selectedColor: 'green',
            },r
          ],
        },
      ];
 */
      const onDateSelectedd = (date:any) => {
         
        let workoutFilter = []
        setDay(new Date(date).getDate())
      
        setWorkoutsFilter([])
        let fechaEqual = workouts.filter((workout:Workout) => new Date(workout.fechaISO).getDate() ===  new Date(date).getDate() )
      /*   console.log('fecha           ',fechaEqual) */
        if(fechaEqual.length>0){
            getDates()
            for(let workout of fechaEqual){
                workoutFilter.push(workout)
              
                console.log('.................................................' + workout)
            }
            setWorkoutsFilter(workoutFilter)
        }else{
            setWorkoutsFilter([])
        }
        
   /*      console.log('El filtro de los worokouts', workoutsFilter)
        console.log('dayy', day) */
        setLastWorkouts(false)
        
      }
    const getDates = () => {
        let markedDatesArray:any = [];
        if(workouts !== undefined){
     
            for( let workoutt of workouts){
      
                markedDatesArray.push({
                    date: new Date(workoutt.fechaISO),
                    dots: [
                       {
                        color:'purple',
                        selectedColor:'white'
                       }
                    ]
                })
              /*   console.log(markedDatesArray)  */
            }
            setDates(markedDatesArray)
        }
        
    }

    const getWorkoutsData = () => {
       
        AsyncStorage.getItem('workout').then((result: any) => {
         /*    console.log('resultad', result) */
            let data = JSON.parse(result)
            setWorkouts(data)
          /*   console.log(data[0].exercises[0].series) */
            setWorkoutsFilter(data)
            setIsLoading(false)
        }).catch((err: any) => {
            console.log(err)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        setIsLoading(true)

      try{
          getWorkoutsData()
          getDates()
         
      }catch(e){
        console.log(e)
        setIsLoading(false)
      }

    }, [])



    const refreshControl = () => {
        const onRefresh = () => {
            try {
                getWorkoutsData()
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

    const getExercises = (exercises: any) => {
        /*  console.log('------------------------------------')
         console.log(exercises.series, 'series') */
        return exercises.map((exercise: Series, index: number) => (
            <View key={index} style={{ borderColor: 'purple', borderWidth: 1, display: 'flex', flexDirection: 'column', marginTop: 3, borderRadius: 5, padding: 3 }}>
                <Text style={{ color: 'purple' }}>{exercise.series.length} x {exercise.exercise}</Text>
                {/*    <View>
                        {exercise.series.map((serie)=> (
                            <View>
                                <Text style={{ color: 'purple' }}>{serie.reps} x {serie.weight}kg</Text>
                            </View>
                        ))}
                    </View> */}

            </View>

        ));
    }

    const deleteWorkout = () => {
        Alert.alert(
            "Eliminar el entrenamiento",
            "¿Estás seguro de elimininar este entrenamiento?",
            [
              {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Eliminar", onPress: async() => {
           
                // setWorkouts

            /*     try {
                    let respuesta;
                    const jsonValue = await AsyncStorage.getItem('workout')
                    if (jsonValue !== null) {
                        console.log('nopooooooo es nullllll')
                        const jsonParse = JSON.parse(jsonValue)
                        let newArray = [...jsonParse, data]
                        console.log('El Json',jsonParse)
                        await AsyncStorage.setItem('workout',JSON.stringify(newArray));
                    }else{
                        let datos=[]
                        datos.push(data)
                        const jsonValue2 = JSON.stringify(datos)
                        await AsyncStorage.setItem('workout', jsonValue2)
                    }
                } catch (e) {
                    console.log('Ha habido un error eliminando el workout')
                } */
                
                }
              }
            ]
          );
        
    }

    const getBestSeries = (exercises: any) => {

        return exercises.map((exercise: any, index: number) => (
            <View key={index} style={{ borderColor: 'purple', borderWidth: 1, display: 'flex', flexDirection: 'column', marginTop: 3, borderRadius: 5, padding: 3 }}>


                {
                    <Text style={{ color: 'purple' }}>{Math.max(...exercise.series.map((serie: any) => serie.weight))} kg x {exercise.series[0].reps} reps</Text>
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
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 26, color: 'white', fontWeight: 'bold' }}>Inicio</Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddWorkout' as never)}>
                            <Svg
                                width={30}
                                height={30}
                                viewBox="0 0 30 30"
                                fill="white"
                                stroke="white"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <Line x1="12" y1="5" x2="12" y2="19" />
                                <Line x1="5" y1="12" x2="19" y2="12" />
                                <Line x1="5" y1="12" x2="19" y2="12" />
                            </Svg>
                        </TouchableOpacity>
                    </View>
         {/*            <View style={{ display: 'flex', alignItems: 'center' }}>
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
                    </View> */}
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <CalendarStrip
                    scrollable
                    markedDates={dates}
                    onDateSelected={onDateSelectedd}
                  /*   selectedDate={new Date()} */
                    calendarAnimation={{type: 'sequence', duration: 30}}
                    daySelectionAnimation={{type:'background', duration: 200, highlightColor:'purple'}}
                    style={[{ height: 80, marginTop:15, paddingTop: 10, paddingBottom: 10, borderRadius:6}, styles.shadowProp]}
                  /*   calendarColor={'#111111'} */
                    calendarColor={'#7743CE'}
                    dateNumberStyle={{color: 'white'}}
                    calendarHeaderStyle={{ color: 'white' }}
                    highlightDateNumberStyle={{color: 'white'}}
                    highlightDateNameStyle={{color: 'white'}}
                    disabledDateNameStyle={{color: 'grey'}}
                        disabledDateNumberStyle={{color: 'grey'}}
                        iconContainer={{flex: 0.1}}
                    dateNameStyle={{ color: 'white' }}
                    iconStyle={{ tintColor: 'white' }}
                />
            </View>
            {isLoading &&
                (<ActivityIndicator size='large' color="purple"/>)
            }
            {lastWorkouts && workoutsFilter.length>0 ? (<View style={{marginTop:13}}>
                <Text style={styles.h3}>Últimos entrenamientos</Text>
            </View>) :
                (<View style={{marginTop:13, display:'flex', flexDirection:'row'}}>
                    <Text style={styles.h3}>Entrenamientos del día</Text><Text style={{fontSize:17, fontWeight:'bold', color:'white'}}> {day}</Text>
                </View>)    
            }

            <View>
                {workoutsFilter !== null ? workoutsFilter.map((workout: Workout, index: number) => (
                    
                    
                    <View key={index}
                        style={{
                            backgroundColor: 'white', width: '100%', borderTopWidth:6, borderTopColor:'purple',
                            marginBottom: 18, borderRadius: 5, paddingHorizontal: 15, paddingVertical: 6
                        }}>
                            
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', marginBottom: 5, color: '#111111', fontSize: 16 }}>{workout.title}</Text>
                            <TouchableOpacity onPress={deleteWorkout}>
                            <Svg
                                    width={23}
                                    height={23}
                                    viewBox="0 0 25 25"
                                    stroke="red"
                                    fill="white"
                                    strokeWidth={2}
                                    >
                                    <Polyline points="3 6 5 6 21 6" />
                                    <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    <Line x1="10" y1="11" x2="10" y2="17" />
                                    <Line x1="14" y1="11" x2="14" y2="17"/>
                                </Svg>
                                        </TouchableOpacity>
                        </View>
                        <Text style={{ fontWeight: 'bold' }}>{workout.fecha}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 9, width: '100%' }}>
                            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Svg
                                    width={15}
                                    height={15}
                                    viewBox="0 0 25 25"
                                    stroke=""
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <Circle cx="12" cy="12" r="10" />
                                    <Polyline points="12 6 12 12 16 14" />
                                </Svg>

                                <Text style={{ textAlign: 'center', marginLeft: 5, color: '#111111' }}>{workout.tiempo}</Text>
                            </View>
                            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                                <Svg
                                    width={15}
                                    height={15}
                                    viewBox="0 0 25 25"
                                    fill="black"
                                    stroke="black"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <Line x1="12" y1="5" x2="12" y2="19" />
                                    <Line x1="5" y1="12" x2="19" y2="12" />
                                    <Line x1="5" y1="12" x2="19" y2="12" />
                                </Svg>
                                <Text style={{ textAlign: 'center', marginLeft: 5, color: '#111111' }}>{workout.totalWeight} Kg</Text>
                            </View>
                            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>

                                <Svg
                                    width={15}
                                    height={15}
                                    viewBox="0 0 25 25"
                                    fill="black"
                                    stroke="black"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <Polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                    <Polyline points="17 6 23 6 23 12" />
                                </Svg>
                                <Text style={{ textAlign: 'right', marginLeft: 5, color: '#111111' }}>{workout.pr} PRs</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontWeight: 'bold', marginBottom: 2, color: '#111111' }}>Ejercicio</Text>
                            <Text style={{ fontWeight: 'bold', marginBottom: 2, color: '#111111' }}>Mejor serie</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 }}>
                            <View style={{ display: 'flex', flexDirection: 'column' }}>
                                {getExercises(workout.exercises)}
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column' }}>
                                {getBestSeries(workout.exercises)}
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Workout', {
                                    id: workout.id,
                                    title: workout.title,
                                    notes: workout.notes,
                                    dia: workout.dia,
                                    fecha: workout.fecha,
                                    fechaISO: workout.fechaISO,
                                    time: workout.tiempo,
                                    pr: workout.pr,
                                    totalWeight: workout.totalWeight,
                                    series: workout.exercises
                                })
                            }}
                        >
                            <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#673ab7', '#512da8']} style={styles.linearGradient}>
                                <Text style={styles.buttonText}>
                                    Ver entrenamiento
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>


                )) :  (<View style={{ height: height * 0.7, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 17, color: 'white' }}>No tienes entrenamientos, añade uno.</Text>
            </View>)
            
            }
            </View>
        </ScrollView>



    )
}
const styles = StyleSheet.create({
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
    view: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#111111',
        height: height,
        width: width,
        padding: 15
    },
    h3: {
        fontSize: 17,
        marginBottom: 18,
        color: 'white'
    },
    shadowProp: {  
        shadowOffset: {width: -2, height: 4},  
        shadowColor: '#171717',
        shadowOpacity: 0.2,  
        shadowRadius: 3,  
      },  

})




