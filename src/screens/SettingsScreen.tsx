import React, { useContext, useEffect, useState } from 'react'
import { Alert, Dimensions, Image, LogBox, Platform, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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



    const downloadCsv = () => {
        // send http request in a new thread (using native code)
        RNFetchBlob.fetch('GET', 'http://www.example.com/images/img1.png', {
            Authorization: 'Bearer access-token...',
            // more headers  ..
        })
            .then((res) => {
                let status = res.info().status;

                if (status == 200) {
                    // the conversion is done in native code
                    let base64Str = res.base64()
                    // the following conversions are done in js, it's SYNC
                    let text = res.text()
                    let json = res.json()
                } else {
                    // handle other status codes
                }
            })
            // Something went wrong:
            .catch((errorMessage: any) => {
                // error handling
                console.log(errorMessage)
            })
    }

    useEffect(() => {
        AsyncStorage.getItem('keepScreenEnabled').then((result: any) => {
            console.log('El resutlado', result)
            let data = JSON.parse(result)
            if (data !== null) setExistKeepAwake(true)
            else setExistKeepAwake(false)

            console.log('eeeeee', data)
            if (data.toString() == 'true') {
                setIsEnabled(true)
                console.log('Eldata', data.toString())
            }
            else setIsEnabled(false)
        }).catch((err: any) => {
            console.log(err)
        })
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
            <Text style={styles.h3}>Ajustes</Text>
            <View style={{ marginBottom: 10, display: 'flex' }}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.titleCat}>Perfil</Text>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Nombre</Text>
                    </View>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Peso</Text>
                    </View>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Altura</Text>
                    </View>
                </View>
                {/*   linea  -----------------------------------------------------------*/}
                <View style={styles.cat}
                />
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.titleCat}>Unidades y localización</Text>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Peso</Text>
                    </View>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Distancia</Text>
                    </View>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Tamaño</Text>
                    </View>
                </View>
                {/*   linea  -----------------------------------------------------------*/}

                <View style={styles.cat} />

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
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Exportar datos</Text>
                    </View>
                </View>


                {/*   linea  -----------------------------------------------------------*/}
                <View
                    style={styles.cat}
                />
                <View style={{ marginBottom: 10 }}>
                    <View style={styles.spacer}>
                        <Text style={styles.titleCat}>Avanzado</Text>
                    </View>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Mantener la pantalla encendida durante el entrenamiento</Text>
                    </View>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Exportar datos</Text>
                    </View>
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




