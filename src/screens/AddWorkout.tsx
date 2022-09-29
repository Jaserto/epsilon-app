
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, Button, Dimensions, Image, LogBox, Platform, Pressable, RefreshControl, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import KeepAwake from '@sayem314/react-native-keep-awake';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Workout } from '../utils/models/Workout';
import Svg, { Polyline } from 'react-native-svg';
import { WorkoutContext } from '../context/WorkoutContext/WorkoutContext';
import { exercises } from '../utils/exercices/data';
import { Exercise } from '../utils/models/Exercise';
import uuid from 'react-native-uuid';
import { UserContext } from '../context/UserContext/UserContext';
import { PersonalRecord } from '../utils/models';
import { BackHandler } from "react-native";

const { width } = Dimensions.get("window");


export const AddWorkoutScreen = (props: any) => {

    const { inputsData, setInputsData } = useContext(WorkoutContext);
    const { keepAwakeScreen, setKeepAwakeScreen } = useContext(UserContext);

    //States
    const [hora, setHora] = useState<number>(0);

    const [error, setError] = useState<any>([]);
    const [pr, setPr] = useState<Array<PersonalRecord>>([]);
    const [notes, setNotes] = useState('');
    const [keepAwake, setKeepAwake] = useState<boolean>(keepAwakeScreen);
    const [secondsLeft, setSecondsLeft] = useState(3600);
    const [remainingSecs, setRemainingSecs] = useState<number>(0);
    const [isActive, setIsActive] = useState(false);
    const [inputs, setInputs] = useState<any>([]);
    const [selectedExercises, setSelectedExercises] = useState<any>([])
    const [exercisesData, setExercisesData] = useState<any>([])
    const [workouts, setWorkouts] = useState<any>([])

    useEffect(() => {

        setHora(new Date().getHours())
        if (inputsData !== null) {
            console.log('EL INPUT ENTRO', inputsData.inputsData)
            let idd = inputsData.inputsData.filter((item: any) => item.inputsData.length > 0)
            console.log('El idd', idd)
            setExercisesData(idd !== undefined && idd)
        }
        //   inputsData !== null && setExercisesData(inputsData !== undefined && inputsData.inputsData)

        if (props.route.params) {
            console.log('el params', props.route.params.selectedExercices)
            setSelectedExercises(props.route.params.selectedExercices)
            addExerciseData(props.route.params.selectedExercices)
        }
        /*  console.log('LOSS INPUTS QUE COMIENZAN A PONERSE',inputsData)
  console.log('LOSS INPUTS QUE COMIENZAN A PONERS3333E',inputsData.inputsData) */
        getDataStorage2()
    }, [])



    function handleBackButtonClick() {
        props.navigation.replace('InicioScreen')
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    

    const deletePR = async() => {
        try {

            await AsyncStorage.removeItem('pr');
            console.log('borrado')
            return true;
        }
        catch(exception) {
            console.log(exception)
            return false;
        }
    }

    const mostrarPR = async() => {
        try {

            const response = await AsyncStorage.getItem('pr');
            console.log(response)
            console.log('mostrado')
            return true;
        }
        catch(exception) {
            console.log(exception)
            return false;
        }
    }



    const finalizeWorkout = () => {
        const _exerciseBlock: any = [...exercisesData]

        let kilos: number = 0;
        let series: number = inputs.length;
        let time = mins + ':' + secs;
        let exercisesInfo: any = [];
        let seriesInfo: any = []
        let emptySerie = []
        setError([])
        for (let item of _exerciseBlock) {
            exercisesInfo.push({
                exercise: exercises.filter(exercise => exercise.id === item.key)[0].nombre,
                idExercise: item.key
            });
            for (let serie of item.inputsData) {
                console.log('------------------La serie', serie)
                if (serie.value != '' && serie.value2 != '') {
                    kilos += parseInt(serie.value) * parseInt(serie.value2);
                    seriesInfo.push({
                        weight: serie.value,
                        reps: serie.value2,
                        exerciseId: serie.exerciseId
                    })
                } else {

                    if (serie.value === '' || serie.value2 === '') {
                        console.log('entro')
                        emptySerie.push({
                            exerciseId: serie.exerciseId,
                            error: true,
                            msg: 'Debes introducir todos los campos.'
                        })
                        setError(emptySerie)
                    }
                    console.log(error)
                    return
                }
            }
            series = item.inputsData.length;
        }
        console.log('ExercisesInfo--', exercisesInfo[0], exercisesInfo.length)
        for (let j = 0; j < seriesInfo.length; j++) {
            console.log('la serie del exercise', seriesInfo[j])

            for (let k = 0; k < exercisesInfo.length; k++) {
                if (seriesInfo[j].exerciseId === exercisesInfo[k].idExercise && exercisesInfo[k].series !== undefined) {
                    exercisesInfo[k].series.push(seriesInfo[j])
                } else if (seriesInfo[j].exerciseId === exercisesInfo[k].idExercise && exercisesInfo[k].series === undefined) {
                    exercisesInfo[k].series = [seriesInfo[j]]
                }
            }

        }


        //se coge de los inputs
        let hora = new Date().getHours()

        /* setData(data) */
        console.log('ExerciseData', seriesInfo)
        console.log('ExercisesInfo ##########', exercisesInfo[0])
        if (exercisesData.length === 0) {
            console.log('no hay nada')

            return;
        } else {
            let prStorage: any = [];
            let storagePr: any = [];
            let storagePr2: any = [];
            let menores: any = []
            AsyncStorage.getItem('pr').then((result: any) => {
                let dataPR = JSON.parse(result)
                console.log('daaataaaPR', dataPR)

                //data async storage
                if (dataPR !== null) {
                    console.log('---------------------------------', dataPR)
                    storagePr = dataPR
                    for (let j = 0; j < exercisesData.length; j++) {
                        for (let k = 0; k < exercisesData[j].inputsData.length; k++) {
                            //cuando hay varias series de un ejercicio controlar que setea el maximo.
                            console.log('INPUTS CON INFO ', exercisesData[j].inputsData[k])
                            let pr = {
                                exerciseId: exercisesData[j].inputsData[k].exerciseId,
                                weight: exercisesData[j].inputsData[k].value
                            }
                            prStorage.push(pr)
                            console.log('prStorage en los inputs', prStorage)
                        }
                    }
                    let result = prStorage.filter((item: any, index: any) => {
                        return prStorage.indexOf(item) === index;
                    })
                    prStorage = result;
                    for (let i = 0; i < prStorage.length; i++) {
                        let pr = {
                            exerciseId: prStorage[i].exerciseId,
                            weight: prStorage[i].weight
                        }
                        for (let p = 0; p < storagePr.length; p++) {
                            console.log('El pr storageeee', prStorage[i])

                            if (storagePr[p].exerciseId === prStorage[i].exerciseId) {
                                console.log('comparandoooo')
                                console.log('ENTRO EL STOPRAGEEE2', Number(prStorage[i].weight));
                                    console.log('ENTRO EL STOPRAGEEE2', Number(storagePr[p].weight));
                                if (Number(prStorage[i].weight) > Number(storagePr[p].weight)) {
                                    console.log('ENTRO EL STOPRAGEEE', Number(prStorage[i].weight), prStorage[i].exerciseId);
                                    console.log('ENTRO EL STOPRAGEEE', Number(storagePr[p].weight));
                                    storagePr2.push(pr)
                                }else{
                                    console.log('no es igual',prStorage[i].weight, Number(storagePr[p].weight))
                                    menores.push(prStorage[i])
                                 /*    storagePr2 = storagePr2.filter((item:any) => item.exerciseId !== storagePr[p].exerciseId) */
                                    console.log('storagepr2 despues',storagePr2)
                                }
                            } else {
                                if (storagePr2.some((element: any) => element.exerciseId === prStorage[i].exerciseId)) {
                                    // let object = storagePr2.find((element:any) => element.exerciseId === prStorage[i].exerciseId)
                                    let index = storagePr2.findIndex((x: any) => x.exerciseId === prStorage[i].exerciseId);
                                    storagePr2.splice(index, 1);
                                    console.log('iiiiii')
                                    storagePr2.push(pr)
                                } else {
                                    storagePr2.push(pr)
                                }
                            }
                        }
                    }
                    console.log('------------------------------------------')
                    console.log('Los menores', menores)

                    const idsNoPermitidos = menores.map((doc:any) => doc.exerciseId);
                    const datosFiltrados = storagePr2.filter((doc:any) => !idsNoPermitidos.includes(doc.exerciseId))
                    storagePr2 = datosFiltrados;
                    console.log('datos filtrados------------',datosFiltrados)
                    console.log(storagePr)
                    console.log(storagePr2)
                    let sinRepetidos = storagePr2.filter((valorActual: any, indiceActual: any, arreglo: any) => {
                        return arreglo.findIndex((valorDelArreglo: any) => JSON.stringify(valorDelArreglo.exerciseId) === JSON.stringify(valorActual.exerciseId)) === indiceActual
                    });
                    storagePr = sinRepetidos;
                    console.log(storagePr)

                    let nuevosYaDentro = dataPR
                    if (storagePr.length > 0) {
                        for (let k = 0; k < sinRepetidos.length; k++) {
                            console.log('iterando', nuevosYaDentro.findIndex((item: any) => item.exerciseId === sinRepetidos[k].exerciseId))
                            let exist = nuevosYaDentro.findIndex((item: any) => item.exerciseId === sinRepetidos[k].exerciseId)
                            if (exist !== undefined || exist !== -1) {
                                nuevosYaDentro[exist] = sinRepetidos[k]
                            }
                            nuevosYaDentro.push(sinRepetidos[k])
                        }
                    }

                    console.log('El pr delicioso', pr)
                    const data: any = {
                        id: uuid.v4(),
                        dia: new Date().getDate(),
                        fecha: new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear(),
                        fechaISO: new Date().toISOString(),
                        title: hora > 12 && hora < 18 ? 'Entrenamiento de tarde' : hora > 18 && hora < 24 ? 'Entrenamiento de noche' : 'Entrenamiento de mañana',
                        tiempo: time,
                        notes: notes,
                        pr: storagePr.length,
                        totalWeight: kilos,
                        mes: new Date().getMonth(),
                        exercises: exercisesInfo
                    }

                    console.log('storageeeee',storagePr2)
                    storeData(data);

                    let mergeArrayPR = [...dataPR];
                    console.log('mergeee', mergeArrayPR)
                    AsyncStorage.setItem('pr', JSON.stringify(mergeArrayPR)).then((resultado: any) => console.log(resultado)).catch((err:any) => console.log(err));
                    if(storagePr.length > 0){
                        props.navigation.replace('NewPr', { storagePr })
                    }else{
                        props.navigation.replace('InicioScreen')
                    }

                    //No existen records en el async storage
                } else {
                    let newRecords:any = []
                    let storagePr:any = []
                    for (let j = 0; j < exercisesData.length; j++) {
                        for (let k = 0; k < exercisesData[j].inputsData.length; k++) {
                            console.log('INPUTS CON INFO ', exercisesData[j].inputsData[k])
                            let pr = {
                                exerciseId: exercisesData[j].inputsData[k].exerciseId,
                                weight: exercisesData[j].inputsData[k].value
                            }
                            if (newRecords.length > 0) {
                                for (let dup of newRecords) {
                                    console.log('El dup ', dup)
                                    console.log('El prStorage mid ', newRecords)
                                    if (dup.exerciseId === exercisesData[j].inputsData[k].exerciseId) {
                                        console.log('El exerciseId esta presente ', dup.exerciseId )
                                     if (Number(exercisesData[j].inputsData[k].value) > Number(dup.weight)) {
                                            console.log(exercisesData[j].inputsData[k].value, '>', dup.weight)
                                            let prStorageMatch1 = {
                                                exerciseId: exercisesData[j].inputsData[k].exerciseId,
                                                weight: exercisesData[j].inputsData[k].value
                                            }
                                            //prStorage = [Object.assign(prStorageMatch,prStorageMatch1)];

                                            console.log('Es mayor')
                                            newRecords = newRecords.filter((item: any) => item.exerciseId !== exercisesData[j].inputsData[k].exerciseId)
                                            newRecords.push(pr)
                                        } else {
                                            console.log('Es menor')
                                        }
                                    } else {
                                        newRecords = newRecords.filter((item: any) => item.exerciseId !== exercisesData[j].inputsData[k].exerciseId)
                                        newRecords.push(pr)
                                    }
                                }
                                console.log('no lo incluye, pero ya esta')
                            } else {
                                newRecords.push(pr)
                            }
                        }
                    }

                /*     let result = newRecords.filter((item: any, index: any) => {
                        return newRecords.indexOf(item) === index;
                    }) */
           /*          const tabla = {} as any;
                    const unicos = result.filter((indice: any) => {
                        return tabla.hasOwnProperty(indice) ? false : (tabla[indice] = true);
                    });
                    */
                    console.log(newRecords.length, '---')
                    console.log(newRecords, '-------')
                    const data: any = {
                        id: uuid.v4(),
                        dia: new Date().getDate(),
                        fecha: new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear(),
                        fechaISO: new Date().toISOString(),
                        title: hora > 12 && hora < 18 ? 'Entrenamiento de tarde' : hora > 18 && hora < 24 ? 'Entrenamiento de noche' : 'Entrenamiento de mañana',
                        tiempo: time,
                        notes: notes,
                        pr: newRecords.length,
                        totalWeight: kilos,
                        mes: new Date().getMonth(),
                        exercises: exercisesInfo
                    }

                    /* storagePr */
                    /*    setInputsData([]) */
                    storagePr = newRecords;

                    AsyncStorage.setItem('pr', JSON.stringify(storagePr)).then((resultado: any) => console.log(resultado)).catch((err:any) => console.log(err));

                    storeData(data)
                        props.navigation.replace('NewPr', { storagePr })
                }

            }).catch((err: any) => {
                console.log(err)
            })
        }
    }


    const addExerciseData = (exercisesId: any) => {
        const _exerciseBlock: any = [...exercisesData]

        if (inputsData === null) {
            for (let exerciseeId of exercisesId) {
                _exerciseBlock.push({ key: exerciseeId, inputsData: [{ key: 0, value: '', value2: '', exerciseId: exerciseeId, exerciseName: 'Ejercicio' }] })
            }

            setInputsData(_exerciseBlock)
            setExercisesData(_exerciseBlock)

        } else {
            if (inputsData !== undefined) {
                const _exerciseBlock: any = [...inputsData.inputsData]
                console.log('entrnadoooooooooooooooooooooooooooooooo', inputsData.inputsData)
                let keyInput = [];
                for (let inputos of inputsData.inputsData) {
                    keyInput.push(inputos.key)
                }
                for (let exerciseeId of exercisesId) {
                    if (!keyInput.includes(exerciseeId)) {
                        _exerciseBlock.push({ key: exerciseeId, inputsData: [{ key: 0, value: '', value2: '', exerciseId: exerciseeId, exerciseName: 'Ejercicio' }] })
                    }
                }
                setExercisesData(_exerciseBlock)
            }
        }


    }

    const addSerie = (exerciseId: any) => {
        const _exerciseBlock = [...exercisesData]
        let ex = _exerciseBlock.find((exerciseData: any) => exerciseData.key === exerciseId);
        console.log('el ex', ex)
        ex.inputsData.push({ key: ex.inputsData.length, value: '', value2: '', exerciseId: exerciseId, exerciseName: 'Ejercicio' })
        setExercisesData(_exerciseBlock)
        setInputsData(_exerciseBlock)
    }


    const deleteSerie = (exerciseId: any, index: any) => {
        /*     const _exerciseBlock = [...inputsData.inputsData] */
        const _exerciseBlock = [...exercisesData]
        console.log('mandando el exer', exerciseId)
        console.log('mandando el exer2', _exerciseBlock)
        if (inputsData !== undefined) {
            let nuevo = []
            for (let op of _exerciseBlock) {
                if (op.key === exerciseId) {
                    op.inputsData.splice(index, 1)
                    //cambiar eliminar ejerccio
                }
                nuevo.push(op)
            }
            console.log('hito', nuevo)

            let ex = _exerciseBlock.find((exerciseData: any) => exerciseData.key === exerciseId);
            let ex2 = nuevo.filter((exerciseData: any) => exerciseData.key !== exerciseId);
            if (ex !== undefined) {
                console.log('ex', ex)
                console.log('ex2', ex2)

                console.log('se quedo vacio')
                console.log('¡nuevoooooo', _exerciseBlock)

                if (ex.inputsData.length > 0) {
                    setExercisesData(nuevo)
                    setInputsData(nuevo)
                } else {
                    setExercisesData(ex2)
                    setInputsData(ex2)
                }
            } else {
                console.log('ex del undefined', ex)
                setExercisesData(nuevo)
                setInputsData(nuevo)

            }
        }

    }

    const exerciseDataHandler = (text: any, text2: any, index: any, exerciseId: any, exerciseName: any) => {
        console.log('Lineeee', 'text: ', text, 'text2: ', text2, 'key: ', index, 'exerciseId: ', exerciseId, 'nameEercuse: ', exerciseName)
        const _exerciseBlock = [...exercisesData]
        console.log(_exerciseBlock)

        for (let exer of _exerciseBlock) {
            if (exer.key === exerciseId) {
                exer.inputsData[index].key = index;
                exer.inputsData[index].value = text;
                exer.inputsData[index].value2 = text2;
                exer.inputsData[index].exerciseId = exerciseId;
                exer.inputsData[index].exerciseName = exerciseName;
            }
        }
        setExercisesData(_exerciseBlock);
    }


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

    const cancel = () => {

    }
    useEffect(() => {
        AsyncStorage.getItem('keepScreenEnabled').then((result: any) => {
            let data = JSON.parse(result)
            if (data !== null && data.toString() == 'true') {
                setKeepAwake(true)
                setKeepAwakeScreen(true)
            }
            else {
                setKeepAwake(false)
                setKeepAwakeScreen(false)
                console.log(keepAwake)
            }
        }).catch((err: any) => {
            console.log(err)
        })

    }, [])

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


    /*     const saveData = async (data: any) => {
            AsyncStorage.getItem('workout')
                .then((workouts) => {
                    const c = workouts ? JSON.parse(workouts) : [];
                    c.push(data);
                    AsyncStorage.setItem('workout', JSON.stringify(c));
                });
        }
     */

    const storeData = async (data: any) => {
        try {
            let respuesta;
            const jsonValue = await AsyncStorage.getItem('workout')
            if (jsonValue !== null) {
                console.log('nopooooooo es nullllll')
                const jsonParse = JSON.parse(jsonValue)
                let newArray = [...jsonParse, data]
                /*  console.log('El Json',jsonParse) */
                await AsyncStorage.setItem('workout', JSON.stringify(newArray));
            } else {
                let datos = []
                datos.push(data)
                const jsonValue2 = JSON.stringify(datos)
                await AsyncStorage.setItem('workout', jsonValue2)
            }
        } catch (e) {
            console.log('Ha habido un error guardando el workout')
        }
    }


    /*  const getDataStorage = async () => {
         try {
             const jsonValue = await AsyncStorage.getItem('workout')
             return jsonValue != null ? JSON.parse(jsonValue) : null;
         } catch (e) {
             return null;
         }
     } */

    const getDataStorage2 = (): any => {

        AsyncStorage.getItem('workout').then((result: any) => {
            /*    console.log('resultad', result) */
            let data = JSON.parse(result)
            setWorkouts(data)
            return data;

        }).catch((err: any) => {
            console.log(err)
        })
    }


    const renderInput = (inputsData: any) => {
        return inputsData.map((inputData: any, index: any) => (
            <View key={index} style={styles.inputContainer}>
                <Text style={{ color: 'white' }}>Serie {index + 1}</Text>
                <TextInput placeholderTextColor='white' keyboardType='numeric' placeholder={"kg"} style={styles.input} value={inputData.value}
                    onChangeText={(text) => exerciseDataHandler(text, inputData.value2, index, inputData.exerciseId, inputData.exerciseName)} />

                <TextInput placeholderTextColor='white' keyboardType='numeric' placeholder={"Repeticiones"} style={styles.input} value={inputData.value2}
                    onChangeText={(text2) => exerciseDataHandler(inputData.value, text2, index, inputData.exerciseId, inputData.exerciseName)} />
                <TouchableOpacity onPress={() => deleteSerie(inputData.exerciseId, inputData.key)} style={{ backgroundColor: 'red', padding: 3, borderRadius: 4 }}>
                    <Text style={{ color: "white", fontSize: 13 }}>Borrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => addSerie(inputData.exerciseId)}
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
        ))
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView style={styles.view}>
                {keepAwakeScreen && <KeepAwake />}
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Añade un nuevo entrenamiento</Text>
                </View>
                <View style={{ marginBottom: 25 }}>
                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginBottom: 6 }}>{hora > 12 && hora < 18 ? 'Entrenamiento de tarde' : hora > 18 && hora < 24 ? 'Entrenamiento de noche' : 'Entrenamiento de mañana'}</Text>
                        <View style={{ marginVertical: 6 }}>
                            <TextInput placeholderTextColor='white' placeholder={'Notas del entrenamiento'} value={notes} style={styles.input} maxLength={40}
                                onChangeText={(text) => setNotes(text)}
                            />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('AddExerciseScreen' as never)}
                                style={[styles.button, { backgroundColor: "#663EE3" }]}>
                                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Añadir ejercicio</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={cancel} style={[styles.button, { backgroundColor: 'purple' }]}>
                                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Cancelar</Text>
                            </TouchableOpacity>
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
                            <View style={{ marginBottom: 20, width: '100%' }}>

                                {exercisesData !== undefined && exercisesData.map((inputsData: any, index: number) => (
                                    <View key={inputsData.key} style={{ display: 'flex' }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>{exercises.filter((exercise: Exercise) => exercise.id === inputsData.key)[0].nombre}</Text>
                                        {inputsData !== undefined && renderInput(inputsData.inputsData)}
                                        {error.length > 0 && error[0].exerciseId === inputsData.inputsData[0].exerciseId && (
                                            <View>
                                                {/*  console.log('El input',inputsData.inputsData[0].inputsData[0].exerciseId) */}
                                                <Text style={{ color: 'red' }}>Error: Inserta todos los datos de la serie</Text>
                                            </View>
                                        )}
                                        <TouchableOpacity onPress={() => addSerie(inputsData.key)} style={{ marginVertical: 10, backgroundColor: "#663EE3", height: 30, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Añade series</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                            <TouchableOpacity style={{ backgroundColor: '#FF3D3D', marginVertical: 10, width: width * 0.7, height: 40, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => finalizeWorkout()}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Terminar entrenamiento</Text>
                            </TouchableOpacity>
                            {/*            DEBUG           */}
                   {/*                  <Button

                                title="Guardar entrenamiento"
                                onPress={() => {
                                    saveData(data)
                                }} />
                            <Button

                                title="Mostrar entrenamiento CLG"
                                onPress={() => {
                                    getDataStorage()
                                }} />
                            <Button

                                title="Borrar todo CLG"
                                onPress={() => {
                                    clearDatabase()
                                }} />
                                   <Button
                                        title="Set PR"
                                        onPress={() => {
                                          putPr()
                                        }} /> */}
                               <Button
                                        title="Show PR"
                                        onPress={() => {
                                          mostrarPR()
                                        }} />
                            <Button
                                        title="Delete PR"
                                        onPress={() => {
                                          deletePR()
                                        }} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    )
}


const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: 'white',
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
        color: 'white',
        borderWidth: 1,
        borderColor: '#663EE3',
        borderRadius: 5,
        padding: 10,
        width: '30%',
        marginVertical: 5
    },

});
