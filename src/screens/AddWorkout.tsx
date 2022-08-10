
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, Button, Dimensions, Image, LogBox, Platform, Pressable, RefreshControl, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Workout } from '../utils/models/Workout';
import Svg, { Polyline } from 'react-native-svg';


const { width, height } = Dimensions.get("window");


export const AddWorkoutScreen = ({ navigation }: any) => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);


    // this will be attached with each input onChangeText
    const [textValue, setTextValue] = useState('');
    // our number of inputs, we can add the length or decrease the length
    const [numInputs, setNumInputs] = useState(1);
    // all our input fields are tracked with this array
    const refInputs = useRef<string[]>([textValue]);

    const [inputs, setInputs] = useState([{ key: '', value: '' }]);


    const addHandler = () => {
        const _inputs = [...inputs];
        _inputs.push({ key: '', value: '' });
        setInputs(_inputs);
    }

    const deleteHandler = (key: any) => {
        const _inputs = inputs.filter((input, index) => index != key);
        setInputs(_inputs);
    }

    const inputHandler = (text: any, key: any) => {
        const _inputs = [...inputs];
        _inputs[key].value = text;
        _inputs[key].key = key;
        setInputs(_inputs);

    }






    const workout = [{
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
    const workout2 = {
        id: 10,
        dia: '22 julio',
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
    }
    //States
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [notes, setNotes] = useState('');
    const [secondsLeft, setSecondsLeft] = useState(3600);
    const [timerOn, setTimerOn] = useState<boolean>(false);
    const [remainingSecs, setRemainingSecs] = useState(0);
    const [isActive, setIsActive] = useState(false);


    const handleSheetChanges = useCallback((index: number) => {
        setIsOpen(true)
        console.log('handleSheetChanges', index);
        bottomSheetRef?.current?.snapToIndex(index);
    }, []);

    // variables
    const snapPoints = useMemo(() => ['3%', '97%'], []);
    const formatNumber = (number: any) => `0${number}`.slice(-2);

    //Functions
    /*     const startTimer = () => {
            BackgroundTimer.runBackgroundTimer(() => {
                setSecondsLeft(secs => {
                    if (secs > 0) return secs - 1
                    else return 0
                })
            }, 1000)
        } */
    /* 
        useEffect(() => {
            if (secondsLeft === 0) BackgroundTimer.stopBackgroundTimer()
        }, [secondsLeft]);
    
        useEffect(() => {
            if (timerOn) startTimer();
            else BackgroundTimer.stopBackgroundTimer();
            return () => {
                BackgroundTimer.stopBackgroundTimer();
            }
        }, [timerOn]) */

    /*    const clockify = () => {
           let hours = Math.floor(secondsLeft / 60 / 60)
           let mins = Math.floor((secondsLeft / 60) % 60)
           let seconds = Math.floor(secondsLeft % 60)
           let displayHours = hours < 10 ? `0${hours}` : hours
           let displayMins = mins < 10 ? `0${mins}` : mins
           let displaySecs = seconds < 10 ? `0${seconds}` : seconds
           return {
               displayHours,
               displayMins,
               displaySecs,
           }
       } */

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

    /*  */

    /* useEffect(() => {
        let interval:any = null;
        if (isActive) {
            interval = setInterval(() => {
                setRemainingSecs(remainingSecs => remainingSecs + 1);
            }, 1000);
        } else if (!isActive && remainingSecs !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, remainingSecs]); */

    


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

    const saveData = async () => {
        AsyncStorage.getItem('workout')
            .then((workouts) => {
                const c = workouts ? JSON.parse(workouts) : [];
                c.push(workout2);
                AsyncStorage.setItem('workout', JSON.stringify(c));
            });
    }


    const storeData2 = async () => {
        try {
            let respuesta;
            const jsonValue = await AsyncStorage.getItem('workout')
            if (jsonValue !== null) {
                const jsonParse = JSON.parse(jsonValue)
                jsonParse.concat(workout2)
                console.log(jsonParse)
                respuesta = JSON.stringify(jsonParse);

            }
            //  const res = jsonValue !== null ? jsonParse.push(workout2) : workout2 ;

            console.log(respuesta)
            //    await AsyncStorage.setItem('workout', JSON.stringify(res))
        } catch (e) {
            // saving error
        }
    }


    const getData = async () => {
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
            <View style={styles.view}>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Añade un nuevo entrenamiento</Text>
                </View>
                <View style={{ marginBottom: 25 }}>
                    <Text style={{ color: 'white', marginBottom: 12, fontWeight: 'bold' }}>INICIO RÁPIDO</Text>
                    <TouchableOpacity
                        onPress={() => handleSheetChanges(1)}
                        style={{ backgroundColor: 'purple', display: 'flex', alignItems: 'center', padding: 5, borderRadius: 5 }}>
                        {
                            isActive ?
                                <Text style={{ color: 'white' }}>{`${mins}:${secs}`}</Text>
                                : <Text style={{ color: 'white' }}>COMENZAR UN ENTRENAMIENTO VACÍO</Text>

                        }
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ color: 'white', marginBottom: 15, fontWeight: 'bold' }}>MIS PLANTILLAS</Text>
                    <Text style={{ color: 'white' }}>Aún no tienes ninguna plantilla personalizada. ¡Haz click en el botón '+' para crear la primera plantilla</Text>
                </View>
                <View style={{ marginBottom: 30 }}>
                    <Text style={{ color: 'white', marginBottom: 13, fontWeight: 'bold' }}>Plantillas de ejemplo</Text>
                    <View>
                        <View style={{ width: width * 0.9, borderRadius: 5, marginBottom: 10, padding: 13, borderWidth: 1, borderColor: 'white' }}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16, marginBottom: 3 }}>Strong 5x5 - Workout A</Text>
                            <View>
                                <Text style={styles.text}>5 x Squat (barbell)</Text>
                                <Text style={styles.text}>5 x Bench Press</Text>
                                <Text style={styles.text}>5 x Deadlift</Text>
                            </View>
                        </View>
                        <View style={{ width: width * 0.9, borderRadius: 5, marginBottom: 10, padding: 13, borderWidth: 1, borderColor: 'white' }}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16, marginBottom: 3 }}>Legs</Text>
                            <View>
                                <Text style={styles.text}>3 x Squat</Text>
                                <Text style={styles.text}>3 x Squat</Text>
                                <Text style={styles.text}>3 x Squat</Text>
                            </View>
                        </View>
                    </View>

                </View>
                {/*  <BottomSheet /> */}
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
                    /*  enablePanDownToClose={true} */
                    onClose={() => setIsOpen(false)}
                >
                    <ScrollView
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
                        }}
                        style={{ paddingHorizontal: 10 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: '#663EE3', borderRadius: 5, padding: 6 }}
                            onPress={() => handleSheetChanges(0)}>
                            <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: 'white' }}>Cerrar</Text>
                        </TouchableOpacity>
                        <View style={{ marginVertical: 20 }}>
                            <Text style={{ fontSize: 20, color: '#363636', fontWeight: 'bold', marginBottom: 10 }}>Entrenamiento por la mañana</Text>
                            <View style={{ marginVertical: 15 }}>
                                {/*   <Text style={styles.labelInput}>Notas del entrenamiento</Text> */}
                                <TextInput placeholder={'Notas del entrenamiento'} value={notes} style={styles.input} maxLength={40} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('AddExerciseScreen' as never)}
                                    style={[styles.button, { backgroundColor: "#663EE3" }]}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Añadir ejercicio</Text>
                                </TouchableOpacity>
                                <View style={[styles.button, { backgroundColor: '#44005F' }]}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Cancelar</Text>
                                </View>
                            </View>

                            <View style={{ display: 'flex', alignItems: 'center', marginVertical: 2 }}>
                                {/*  <Text style={{ fontSize: 30, marginVertical: 10 }}>
                                    {clockify().displayHours} H {clockify().displayMins} Mins{" "}
                                    {clockify().displaySecs} s
                                </Text> */}
                                {/*      <Pressable
                                    style={{backgroundColor:'purple'}}
                                    onPress={() => setTimerOn(timerOn => !timerOn)}
                                >
                                    <Text sty>START/stop</Text>
                                </Pressable> */}
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
                                {/* <TouchableOpacity
                                    onPress={() => setTimerOn(timerOn => !timerOn)}
                                    style={{
                                        alignSelf: 'center',
                                        height: width * 0.22,
                                        borderRadius: width / 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 6,
                                        borderColor: '#663EE3',
                                        backgroundColor: 'transparent', width: width * 0.22
                                    }}
                                    activeOpacity={1}
                                >

                                    <Text style={styles.buttonText}>
                                        START
                                    </Text>

                                </TouchableOpacity> */}
                                <View style={{ marginVertical: 5, width: '100%' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Bench Press (Barbell)</Text>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            width: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginVertical: 6
                                        }}>
                                        <Text>Serie 1</Text>
                                        <TextInput keyboardType='numeric' placeholder={'Kg'} value={notes} style={styles.inputData} maxLength={40} />
                                        <TextInput keyboardType='numeric' placeholder={'Repeticiones'} value={notes} style={styles.inputData} maxLength={40} />
                                        <TouchableOpacity style={{ display: 'flex', alignItems: 'center', width: '13%', height: 40, borderRadius: 6, justifyContent: 'center', backgroundColor: "#663EE3" }}>
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
                                </View>
                                <View style={{ marginVertical: 5, width: '100%' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Bench Press (Barbell)</Text>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            width: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginVertical: 6
                                        }}>
                                        <Text>Serie 1</Text>
                                        <TextInput keyboardType='numeric' placeholder={'Kg'} value={notes} style={styles.inputData} maxLength={40} />
                                        <TextInput keyboardType='numeric' placeholder={'Repeticiones'} value={notes} style={styles.inputData} maxLength={40} />
                                        <TouchableOpacity style={{ display: 'flex', alignItems: 'center', width: '13%', height: 40, borderRadius: 6, justifyContent: 'center', backgroundColor: "#663EE3" }}>
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
                                </View>

                                <Text style={{ alignSelf: 'center', fontSize: 17, color: "#663EE3", marginVertical: 7 }}>Añadir serie</Text>
                                <Text style={{ alignSelf: 'center', fontSize: 17, color: "#663EE3", marginVertical: 7 }}>Añadir Ejercicio</Text>

                                <TouchableOpacity style={{ marginVertical: 10, width: width * 0.7, backgroundColor: 'red', height: 40, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Terminar entrenamiento</Text>
                                </TouchableOpacity>
                                <View style={{marginBottom:20, width:'100%'}}>


                                    {inputs.map((input, key) => (
                                        <View style={styles.inputContainer}>
                                              <Text>Serie 1</Text>
                                            <TextInput placeholder={"kg"} style={styles.input} value={input.value} onChangeText={(text) => inputHandler(text, key)} />
                                            <TextInput placeholder={"Repeticiones"} style={styles.input} value={input.value} onChangeText={(text) => inputHandler(text, key)} />
                                            <TouchableOpacity onPress={() => deleteHandler(key)}>
                                                <Text style={{ color: "red", fontSize: 13 }}>Borrar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ display: 'flex', alignItems: 'center', width: '13%', height: 40, borderRadius: 6, justifyContent: 'center', backgroundColor: "#663EE3" }}>
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
                                    ))}
                                    <Button title="Añade series" onPress={addHandler} />

                                </View>

                                {/* DEBUG                               */}
                                <Button

                                    title="Guardar entrenamiento"
                                    onPress={() => {
                                        saveData()
                                    }} />
                                <Button

                                    title="Mostrar entrenamiento CLG"
                                    onPress={() => {
                                        getData()
                                    }} />
                                <Button

                                    title="Borrar todo CLG"
                                    onPress={() => {
                                        deleteData()
                                    }} />
                            </View>
                        </View>

                    </ScrollView>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        color: 'purple',
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
        color: '#663EE3',
        fontSize: 45,
        marginBottom: 20
    },
    buttonReset: {
        borderColor: "#44005F"
    },
    buttonTextReset: {
        color: "#663EE3"
    },
    text: {
        fontSize: 15,
        color: 'white',
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
        marginVertical: 5
    },
    inputData: {
        height: 40,
        borderWidth: 1,
        borderColor: '#663EE3',
        borderRadius: 5,
        padding: 10,
        width: '30%',
        marginVertical: 5
    },

})


