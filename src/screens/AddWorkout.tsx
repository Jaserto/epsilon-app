
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, Button, Dimensions, Image, LogBox, Platform, Pressable, RefreshControl, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Workout } from '../utils/models/Workout';
import Svg, { Polyline } from 'react-native-svg';
import { WorkoutContext } from '../context/WorkoutContext/WorkoutContext';
import { exercises } from '../utils/exercices/data';
import { Exercise } from '../utils/models/Exercise';


const { width, height } = Dimensions.get("window");


export const AddWorkoutScreen = (props: any) => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    const { workout, getData, clearDatabase , inputsData, setInputsData } = useContext(WorkoutContext);

    //States
    const [data, setData] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [notes, setNotes] = useState('');
    const [secondsLeft, setSecondsLeft] = useState(3600);
    const [remainingSecs, setRemainingSecs] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [inputs, setInputs] = useState<any>([]);
    const [selectedExercises, setSelectedExercises] = useState<any>([])
    const [exercisesData, setExercisesData] = useState<any>([])
  /*   { key: '', value: '', value2:'', exerciseId:''  */
  /* console.log(props.route.params.selectedExercices) */

    useEffect(() => {
       if(  props.route.params ){
       
           setSelectedExercises(props.route.params.selectedExercices)
        console.log(props.route.params.selectedExercices)
        let lastElement = props.route.params.selectedExercices[props.route.params.selectedExercices.length - 1]

            if(!selectedExercises.includes(lastElement)){
                console.log('uno nuevo ', lastElement)
                addExerciseData(lastElement)
            }else{
                console.log('no hay nuevos')
            }
      
      
    
       }
  
        let res = inputsData !== null ? inputsData.inputsData : ''
       /*  if( inputsData !== null){
            setInputs(inputsData.inputsData)

        } */
       }, [ props.route.params ])
      
    const addExerciseData = (exerciseId:any) => {
        const _exerciseBlock = [...exercisesData]
        _exerciseBlock.push({ key: exerciseId, inputs:{key:'', value: '', value2: '', exerciseId, exerciseName: 'Ejercicio'}})

    /*    let name = exercises.filter((exercise) => exercise.id ===exerciseId) */
        setExercisesData(_exerciseBlock)
    }
    const deleteExerciseData = (key: any) => {
        const _exercisesData = exercisesData.filter((input:any, index:any) => index != key);
        setExercisesData(_exercisesData);
    }

    const exerciseDataHandler = (text: any, text2:any, key: any, exerciseId:any,exerciseName:any) => {
        const _exerciseBlock = [...selectedExercises]
        _exerciseBlock[exerciseId].key = exerciseId
        _exerciseBlock[exerciseId].inputs.name = exerciseName;
        _exerciseBlock[exerciseId].inputs.key = exerciseId;
        _exerciseBlock[exerciseId].inputs.value = text;
        _exerciseBlock[exerciseId].inputs.value2  = text2;
        setExercisesData(_exerciseBlock);
  
    }

     const addInputExerciseData = (exerciseId:any ) => {
        const _exercisesData = [...exercisesData];
        _exercisesData.filter((exercisesInputs:any) => exercisesInputs.exer)
     }



    ////////////////////////////////////////////////////////////////////////



    const addHandler = async(exerciseId:any) => {
        const _inputs = [...inputs];
        _inputs.push({ key: '', value: '', value2:'', exerciseId });
        console.log(_inputs)
        setInputsData(_inputs)
        setInputs(_inputs);
    }
    async function funcion():Promise<void>{
      setInputs(inputsData.inputsData)
      
    } 
   

    const deleteHandler = (key: any) => {
        const _inputs = inputs.filter((input:any, index:any) => index != key);
        setInputs(_inputs);
    }

    const inputHandler = (text: any, text2:any, key: any, exerciseId:any) => {
        const _inputs = [...inputs];
        _inputs[key].value = text;
        _inputs[key].value2 = text2;
        _inputs[key].key = key;
        _inputs[key].key = exerciseId;

        setInputs(_inputs);
      /*   console.log(text, text2, key) */

        let kilos:number = 0;
        let series:number = inputs.length;
        let seriesInfo:any=[]
        let repeticiones:number=0
        let time = mins+':'+secs;

        for(let i=0; i<inputs.length;i++){
         
           series = 
            kilos += parseInt(inputs[i].value)
            repeticiones += parseInt(inputs[i].value2) === undefined ? 0 : parseInt(inputs[i].value2)
            seriesInfo.push({
                weight:inputs[i].value,
                reps:inputs[i].value2
            })
        }
        
        //console.log(kilos, repeticiones, series)
  /* 
        let hora = new Date().getHours()
        const data:any = {
            id: 10,
            dia: Date.now(),
            title: hora > 12 && hora < 18 ? 'Entrenamiento de tarde' : hora > 18 && hora < 24 ? 'Entrenamiento de noche' : 'Entrenamiento de mañana',
            tiempo: time,
            notes: 'Almost die with 1090000RPe',
            pr: 2,
            totalWeight: kilos,
            mes: 7,
            exercises: [
                {
                    id: 12304,
                    exercise: 'Barbell Squat',
                    series: seriesInfo
                }
            ]
        }

        setData(data) */

    }


    const workout1 = [{
        id: 9,
        dia: '20 julio',
        title: 'Entrenamiento de mañana',
        tiempo: '1h 10m',
        notes: 'Almost die with 10RPe',
        pr: 2,
        totalWeight: 6086,
        mes: 7,
        exercises: [
            {
                id: 12304,
                exercise: 'Barbell Squat',
                series: [
                    {
                        reps: 5,
                        weight: 10
                    },
                    {
                        reps: 5,
                        weight: 20
                    },
                    {
                        reps: 5,
                        weight: 30
                    }
                ]
            },
            {
                id: 12305,
                exercise: 'Barbell Squat',
                series: [
                    {
                        reps: 5,
                        weight: 40
                    },
                    {
                        reps: 5,
                        weight: 50
                    },
                    {
                        reps: 5,
                        weight: 60
                    }
                ]
            },
            {
                id: 1234,
                exercise: 'Barbell Squat',
                series: [
                    {
                        reps: 5,
                        weight: 70
                    },
                    {
                        reps: 5,
                        weight: 80
                    },
                    {
                        reps: 5,
                        weight: 90
                    }
                ]
            }
        ]
    }]
    


    const handleSheetChanges = useCallback((index: number) => {
        setIsOpen(true)
        console.log('handleSheetChanges', index);
        bottomSheetRef?.current?.snapToIndex(index);
    }, []);

    // variables
    const snapPoints = useMemo(() => ['3%', '97%'], []);
    const formatNumber = (number: any) => `0${number}`.slice(-2);


    const toggle = () => {
        setIsActive(!isActive);
    }

    const reset = () => {
        setRemainingSecs(0);
        setIsActive(false);
    }
    const startTimer = () => {
        BackgroundTimer.runBackgroundTimer(() => {

            setRemainingSecs(remainingSecs => remainingSecs + 1);

        }, 1000)
    }
    const getRemaining = (time: any) => {
        const mins = Math.floor(time / 60);
        const secs = time - mins * 60;
        return { mins: formatNumber(mins), secs: formatNumber(secs) };
    }
    const { mins, secs } = getRemaining(remainingSecs);




    useEffect(() => {
        if (remainingSecs === 0) BackgroundTimer.stopBackgroundTimer()

    }, [secondsLeft]);

    useEffect(() => {
        if (isActive) startTimer();
        else BackgroundTimer.stopBackgroundTimer();
        return () => {
            BackgroundTimer.stopBackgroundTimer();
        }
    }, [isActive])

    const storeData = async () => {
        try {

            const jsonValue = JSON.stringify(workout)
            await AsyncStorage.setItem('workout', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    const saveData = async (data:any) => {
        AsyncStorage.getItem('workout')
            .then((workouts) => {
                const c = workouts ? JSON.parse(workouts) : [];
                c.push(data);
                AsyncStorage.setItem('workout', JSON.stringify(c));
            });
    }


    const storeData2 = async (data:any) => {
        try {
            let respuesta;
            const jsonValue = await AsyncStorage.getItem('workout')
            if (jsonValue !== null) {
                const jsonParse = JSON.parse(jsonValue)
                jsonParse.concat(data)
                console.log(jsonParse)
                respuesta = JSON.stringify(jsonParse);
               
            }
            //  const res = jsonValue !== null ? jsonParse.push(workout2) : workout2 ;

            console.log(respuesta)
           // await AsyncStorage.setItem('workout', JSON.stringify(res))
        } catch (e) {
            // saving error
        }
    }


    const getDataStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('workout')
            console.log(jsonValue)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }



    const deleteData = async () => {
        try {
            await AsyncStorage.removeItem('workout');
            return console.log('se Borro todo');
        }
        catch (exception) {
            return false;
        }
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView  style={styles.view}>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Añade un nuevo entrenamiento</Text>
                </View>
                <View style={{ marginBottom: 25 }}>
                        <View style={{ marginVertical: 5}}>
                            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginBottom: 6 }}>Entrenamiento por la mañana</Text>
                            <View style={{ marginVertical: 6 }}>
                                <TextInput  placeholderTextColor='white' placeholder={'Notas del entrenamiento'} value={notes} style={styles.input} maxLength={40} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate('AddExerciseScreen' as never)}
                                    style={[styles.button, { backgroundColor: "#663EE3" }]}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Añadir ejercicio</Text>
                                </TouchableOpacity>
                                <View style={[styles.button, { backgroundColor: 'purple'}]}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Cancelar</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', alignItems: 'center', marginVertical: 2 }}>
               
                                <View style={{ display: 'flex', alignItems: 'center' }}>
                                    <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
                                    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', width: width * 0.77, justifyContent: 'space-around', marginBottom: 30 }}>
                                        <TouchableOpacity onPress={() => toggle()} style={styles.button2}>
                                            <Text style={styles.buttonText}>{isActive ? 'Pausa' : 'Start'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => reset()} style={[styles.button2, styles.buttonReset]}>
                                            <Text style={[styles.buttonText, styles.buttonTextReset]}>Reset</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                      
                           
                                <View style={{marginBottom:20, width:'100%'}}>
                                    {exercisesData.map((input:any, key:any, exerciseId:any, exerciseName:any) => (
                                       <View key={key} style={{display:'flex'}}>
                                       <Text style={{color:'white', fontWeight:'bold', fontSize:17}}>{exercises.filter((exercise:Exercise) => exercise.id === 3)[0].nombre}</Text>
                                   <View  style={styles.inputContainer}>
                                         <Text style={{color:'white'}}>Serie 1</Text>
                                       <TextInput placeholderTextColor='white' keyboardType = 'numeric' placeholder={"kg"}  style={styles.input} value={input.value} onChangeText={(text) => exerciseDataHandler(text, input.value2 , key, exerciseId)} />
                                       <TextInput placeholderTextColor='white' keyboardType = 'numeric' placeholder={"Repeticiones"} style={styles.input} value={input.value2} onChangeText={(text2) => exerciseDataHandler(input.value, text2, key, exerciseId)} />
                                       <TouchableOpacity onPress={() => deleteHandler(key)}>
                                           <Text style={{ color: "red", fontSize: 13 }}>Borrar</Text>
                                       </TouchableOpacity>
                                       <TouchableOpacity 
                                    /*    onPress={() => addHandler(exerciseId)} */
                                       style={{ display: 'flex', alignItems: 'center', width: '13%', height: 40, borderRadius: 6, justifyContent: 'center', backgroundColor: "#663EE3" }}>
                                       <Svg
                                           width={32}
                                           height={32}
                                           viewBox="0 0 28 28"
                                           fill="none"
                                           stroke="white"
                                           strokeWidth={2}
                                           strokeLinecap="round"
                                           strokeLinejoin="round">
                                           <Polyline points="20 6 9 17 4 12" />
                                       </Svg>
                                   </TouchableOpacity>

                                   </View>
                                   <TouchableOpacity /* onPress={addHandler(3)} */ style={{ marginVertical: 10, backgroundColor: 'purple', height: 30, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                               <Text style={{ color: 'white', fontWeight: 'bold' }}>Añade series</Text>
                           </TouchableOpacity>
                                   </View>  
                                    ))}
                                {/*     {inputs.map((input:any, key:any, exerciseId:any) => (
                                        <View key={key} style={{display:'flex'}}>
                                            <Text style={{color:'white', fontWeight:'bold', fontSize:17}}>{exercises.filter((exercise:Exercise) => exercise.id === 3)[0].nombre}</Text>
                                        <View  style={styles.inputContainer}>
                                              <Text style={{color:'white'}}>Serie 1</Text>
                                            <TextInput placeholderTextColor='white' keyboardType = 'numeric' placeholder={"kg"}  style={styles.input} value={input.value} onChangeText={(text) => inputHandler(text, input.value2 , key, exerciseId)} />
                                            <TextInput placeholderTextColor='white' keyboardType = 'numeric' placeholder={"Repeticiones"} style={styles.input} value={input.value2} onChangeText={(text2) => inputHandler(input.value, text2, key, exerciseId)} />
                                            <TouchableOpacity onPress={() => deleteHandler(key)}>
                                                <Text style={{ color: "red", fontSize: 13 }}>Borrar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity 
                                            onPress={() => addHandler(exerciseId)}
                                            style={{ display: 'flex', alignItems: 'center', width: '13%', height: 40, borderRadius: 6, justifyContent: 'center', backgroundColor: "#663EE3" }}>
                                            <Svg
                                                width={32}
                                                height={32}
                                                viewBox="0 0 28 28"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round">
                                                <Polyline points="20 6 9 17 4 12" />
                                            </Svg>
                                        </TouchableOpacity>

                                        </View>
                                        <TouchableOpacity  style={{ marginVertical: 10, backgroundColor: 'purple', height: 30, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Añade series</Text>
                                </TouchableOpacity>
                                        </View>
                                    ))} */}

                                </View>
                                 
                                <TouchableOpacity style={{ marginVertical: 10, width: width * 0.7, backgroundColor: 'red', height: 40, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Terminar entrenamiento</Text>
                                </TouchableOpacity>
                                {/* DEBUG                               */}
                                <Button

                                    title="Guardar entrenamiento"
                                    onPress={() => {
                                        saveData(data)
                                    }} />
                                <Button

                                    title="Mostrar entrenamiento CLG"
                                    onPress={() => {
                                        /* getDataStorage() */
                                        funcion()
                                    }} />
                                <Button

                                    title="Borrar todo CLG"
                                    onPress={() => {
                                        clearDatabase()
                                    }} />
                            </View>
                        </View>



                </View>
    
    
           {/*      <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
         
                    animateOnMount={true}
                    enableOverDrag={false}
                    onClose={() => setIsOpen(false)}
                >

            <TouchableOpacity
                            style={{ backgroundColor: '#663EE3', borderRadius: 5, padding: 6 }}
                            onPress={() => handleSheetChanges(0)}>
                            <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: 'white' }}>Cerrar</Text>
                        </TouchableOpacity>

                        <View style={{ marginBottom: 20 }}>
                    <Text style={{ color: 'gray', marginBottom: 15, fontWeight: 'bold' }}>MIS PLANTILLAS</Text>
                    <Text style={{ color: 'gray' }}>Aún no tienes ninguna plantilla personalizada. ¡Haz click en el botón '+' para crear la primera plantilla</Text>
                </View>
                <View style={{ marginBottom: 30 }}>
                    <Text style={{ color: 'gray', marginBottom: 13, fontWeight: 'bold' }}>Plantillas de ejemplo</Text>
                    <View>
                        <View style={{ width: width * 0.9, borderRadius: 5, marginBottom: 10, padding: 13, borderWidth: 1, borderColor: 'gray' }}>
                            <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 16, marginBottom: 3 }}>Strong 5x5 - Workout A</Text>
                            <View>
                                <Text style={styles.text}>5 x Squat (barbell)</Text>
                                <Text style={styles.text}>5 x Bench Press</Text>
                                <Text style={styles.text}>5 x Deadlift</Text>
                            </View>
                        </View>
                        <View style={{ width: width * 0.9, borderRadius: 5, marginBottom: 10, padding: 13, borderWidth: 1, borderColor: 'gray' }}>
                            <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 16, marginBottom: 3 }}>Legs</Text>
                            <View>
                                <Text style={styles.text}>3 x Squat</Text>
                                <Text style={styles.text}>3 x Squat</Text>
                                <Text style={styles.text}>3 x Squat</Text>
                            </View>
                        </View>
                    </View>

                </View>
                </BottomSheet> */}
                
            </ScrollView>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        color:'white',
        alignItems: 'center',
        borderBottomColor: "lightgray"
    },
    view: {
        flexDirection: 'column',
        backgroundColor: '#111111',
        flex: 1,
        padding: 15,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
    linearGradient: {
        marginVertical: 6,
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 6
    },
    button2: {
        borderWidth: 6,
        borderColor: '#B9AAFF',
        width: width / 4,
        height: width / 4,
        borderRadius: width / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    timerText: {
        color: 'white',
        fontSize: 45,
        marginBottom: 20
    },
    buttonReset: {
        borderColor: "#44005F"
    },
    buttonTextReset: {
        color: "white"
    },
    text: {
        fontSize: 15,
        color: 'gray',
        marginBottom: 10
    },
    labelInput: {
        paddingHorizontal: 10,
    },
    button: {
        alignSelf: 'center',
        padding: 10,
        borderRadius: 6,
        width: width * 0.45,
        marginBottom: 6
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#663EE3',
        borderRadius: 5,
        padding: 10,
        color: 'white',
        marginVertical: 5
    },
    inputData: {
        height: 40,
        color:'white',
        borderWidth: 1,
        borderColor: '#663EE3',
        borderRadius: 5,
        padding: 10,
        width: '30%',
        marginVertical: 5
    },

})


