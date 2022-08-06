
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, Button, Dimensions, Image, LogBox, Platform, Pressable, RefreshControl, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet';
import BackgroundTimer from 'react-native-background-timer';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get("window");


export const AddWorkoutScreen = ({ navigation }: any) => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

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
    const startTimer = () => {
        BackgroundTimer.runBackgroundTimer(() => {
            setSecondsLeft(secs => {
                if (secs > 0) return secs - 1
                else return 0
            })
        }, 1000)
    }

    const toggle = () => {
        setIsActive(!isActive);
    }

    const reset = () => {
        setRemainingSecs(0);
        setIsActive(false);
    }

    const getRemaining = (time: any) => {
        const mins = Math.floor(time / 60);
        const secs = time - mins * 60;
        return { mins: formatNumber(mins), secs: formatNumber(secs) };
    }
    const { mins, secs } = getRemaining(remainingSecs);

    useEffect(() => {
        if (secondsLeft === 0) BackgroundTimer.stopBackgroundTimer()
    }, [secondsLeft]);

    useEffect(() => {
        if (timerOn) startTimer();
        else BackgroundTimer.stopBackgroundTimer();
        return () => {
            BackgroundTimer.stopBackgroundTimer();
        }
    }, [timerOn])

    useEffect(() => {
        let interval:any = null;
        if (isActive) {
            interval = setInterval(() => {
                setRemainingSecs(remainingSecs => remainingSecs + 1);
            }, 1000);
        } else if (!isActive && remainingSecs !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, remainingSecs]);


    const clockify = () => {
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
                            timerOn ?
                                <Text style={{ color: 'white' }}>COMENZAR UN ENTRENAMIENTO VACÍO</Text>
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
                    <View style={{ paddingHorizontal: 10 }}>
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
                            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={[styles.button, { backgroundColor: '#005DD5' }]}>
                                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Añadir ejercicio</Text>
                            </View>
                            <View style={[styles.button, { backgroundColor: '#E43434' }]}>
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
                                 <View style={{ display:'flex', alignItems:'center'}}>
                                <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
                                <View style={{ display:'flex', alignItems:'center', flexDirection:'row', width: width*0.77, justifyContent:'space-around'}}>
                                <TouchableOpacity onPress={() => toggle()} style={styles.button2}>
                                    <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
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
                            </View>
                           
                        </View>
                    </View>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
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
        borderWidth: 10,
        borderColor: '#B9AAFF',
        width: width / 3,
        height: width / 3,
        borderRadius: width / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    timerText: {
        color: '#663EE3',
        fontSize: 70,
        marginBottom: 20
    },
    buttonReset: {
        borderColor: "#E43434"
    },
    buttonTextReset: {
        color: "#E43434"
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
    },

})


