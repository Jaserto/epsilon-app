import React, { useContext, useEffect, useState } from 'react'
import { Alert, Dimensions, ToastAndroid, LogBox, PermissionsAndroid, Platform, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView, Switch } from 'react-native-gesture-handler'
import 'react-native-get-random-values';
import { activateKeepAwake, deactivateKeepAwake } from "@sayem314/react-native-keep-awake";
import RNFetchBlob from 'rn-fetch-blob'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../context/UserContext/UserContext';
const { width, height } = Dimensions.get("window");

export const SettingsScreen = ({ navigation }: any) => {

    const { keepAwakeScreen, setKeepAwakeScreen } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isEnabled, setIsEnabled] = useState<boolean>(keepAwakeScreen);
    const [existKeepAwake, setExistKeepAwake] = useState<boolean>();
    const [visibleToast, setVisibleToast] = useState(false);

    const toggleSwitch = async () => {
        /*  setIsEnabled(previousState => !previousState) */
        /*   let exist =  */

        if (existKeepAwake) {
            console.log(!isEnabled)
            setIsEnabled(!isEnabled)
            await AsyncStorage.setItem('keepScreenEnabled', JSON.stringify(!isEnabled))
                .then(() => {
                    setKeepAwakeScreen(!isEnabled)
                    /*      setIsEnabled(!isEnabled) */
                })
                .catch(error => console.log(error))

        } else {
            console.log(!isEnabled)
            setIsEnabled(!isEnabled)
            await AsyncStorage.mergeItem('keepScreenEnabled', JSON.stringify(!isEnabled))
                .then(() => {
                    setKeepAwakeScreen(!isEnabled)
                    /*      setIsEnabled(!isEnabled) */
                })
                .catch(error => console.log(error))
        }

    }

    const Toast = ({ visible, message }:any) => {
        if (visible) {
          ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
          return null;
        }
        return null;
      };

    const handleDownload = async() => {
        try{

       //Check permission
        let isPermitedExternalStorage = await PermissionsAndroid.check(
               PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );


        if(!isPermitedExternalStorage){
            //ask for permission
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Se necesita permiso',
                    message:'Guardar arhivo CSV',
                    buttonNeutral:'Pregúntame más tarde',
                    buttonNegative: 'Cancelar',
                    buttonPositive: 'Ok'
                }
            );

            if(granted === PermissionsAndroid.RESULTS.GRANTED){
                //permission Grante calling out function
                setVisibleToast(true);
                downloadCSV()
                console.log('Permission granted')
            }else{
                console.log('Permission denied')
            }
        }else{
            //Already have permsssion calling out Function
            downloadCSV()
        }

        }catch(err){
            console.log(err)
            Alert.alert('Error', 'No tiene permisos');
        }
    }

    useEffect(() => {
        setVisibleToast(false)
        AsyncStorage.getItem('keepScreenEnabled').then((result: any) => {
            let data = JSON.parse(result)
            if (data !== null) setExistKeepAwake(true)
            else setExistKeepAwake(false)

            if (data !== null && data.toString() === 'true') {
                setIsEnabled(true)
                console.log('Eldata', data.toString())
            }
            else setIsEnabled(false)
        }).catch((err: any) => {
            console.log(err)
        })
        getWorkoutData()
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



    const getWorkoutData = () => {
        const data = []
        AsyncStorage.getItem('pr')
        .then((result: any) => {
            let dataPR = JSON.parse(result)
            console.log(dataPR)
        })
        .catch(error => console.log(error))
    }


   const downloadCSV = () => {
        setVisibleToast(true)
        const values = [
            ['build', '2017-11-05T05:40:35.515Z'],
            ['deploy', '2017-11-05T05:42:04.810Z']
          ];
          
          // construct csvString
          const headerString = 'event,timestamp\n';
          const rowString = values.map(d => `${d[0]},${d[1]}\n`).join('');
          const csvString = `${headerString}${rowString}`;
          
          // write the current list of answers to a local csv file
          const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/dataExercises.csv`;
          console.log('pathToWrite', pathToWrite);
        
          // pathToWrite /storage/emulated/0/Download/data.csv
          RNFetchBlob.fs
            .writeFile(pathToWrite, csvString, 'utf8')
            .then(() => {
              console.log(`wrote file ${pathToWrite}`);
              // wrote file /storage/emulated/0/Download/data.csv
            })
            .catch(error => console.error(error));
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
            <Text style={styles.h3}>Ajustes</Text>
            <View style={{ marginBottom: 10, display: 'flex' }}>
                <View style={styles.cat} />
                <Toast visible={visibleToast} message="Descargando..." />
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.titleCat}>General</Text>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Mantener la pantalla encendida durante el entrenamiento</Text>
                        <Switch
                            trackColor={{ false: "#A23DFF", true: "#A23DFF" }}
                            /*   activeThumbColor="#fff" */
                            thumbColor="#fff"
                            /*     activeTrackColor="#1DA1F2" */
                            /*     ios_backgroundColor="#F0F8FF" */
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    <TouchableOpacity onPress={handleDownload}>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Exportar datos</Text>
                    </View>
                    </TouchableOpacity>
                </View>


                <View
                    style={styles.cat}
                />
                <View style={{ marginBottom: 10 }}>
                    <View style={styles.spacer}>
                        <Text style={styles.titleCat}>Contacto y soporte</Text>
                    </View>
                    <Text style={{ padding: 8, backgroundColor: 'purple', borderRadius: 4, color: 'white', marginBottom: 16 }}>Si quieres informar sobre un problema puedes contactarme a través de las siguientes redes sociales. </Text>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Twitter @serdev_es</Text>
                    </View>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Instagram @serdev_es</Text>
                    </View>
                </View>

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
    titleCat:
        { color: 'white', fontSize: 17, fontWeight: 'bold', marginBottom: 12 },
    cat: {
        width: '100%',
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 10
    },
    cardFecha: {
        display: 'flex',
        alignItems: 'center',
        maxWidth: '40%',
        height: 110,
    },
    spacer: {
        marginBottom: 11,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    h3: {
        fontSize: 30,
        marginBottom: 18,
        color: 'white'
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    text: {
        lineHeight: 20,
        fontSize: 15,
        color: 'white',
        marginBottom: 10
    },

})




