import React, { useContext, useEffect, useState } from 'react'
import { Alert, Dimensions, Image, LogBox, Platform, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView, Switch } from 'react-native-gesture-handler'
import 'react-native-get-random-values';
import RNFetchBlob from 'rn-fetch-blob'

const { width, height } = Dimensions.get("window");

export const SettingsScreen = ({ navigation }: any) => {


    const [isLoading, setIsLoading] = useState<boolean>(false)


    const downloadCsv = () => {

        // send http request in a new thread (using native code)
        RNFetchBlob.fetch('GET', 'http://www.example.com/images/img1.png', {
            Authorization : 'Bearer access-token...',
            // more headers  ..
        })
        .then((res) => {
            let status = res.info().status;
            
            if(status == 200) {
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
        .catch((errorMessage:any) => {
            // error handling
            console.log(errorMessage)
        })
    }

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
            <Text style={styles.h3}>Ajustes</Text>
            <View style={{ marginBottom: 10, display: 'flex' }}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.titleCat}>Perfil</Text>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Editar</Text>
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
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            ios_backgroundColor="#3e3e3e"
                        />
                    </View>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Tamaño</Text>
                    </View>
                </View>
                {/*   linea  -----------------------------------------------------------*/}

                <View style={styles.cat}/>

                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.titleCat}>General</Text>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Mantener la pantalla encendida durante el entrenamiento</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            ios_backgroundColor="#3e3e3e"
                        />
                    </View>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Exportar datos</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            ios_backgroundColor="#3e3e3e"
                        />
                    </View>
                    <View style={styles.spacer}>
                        <Text style={{ color: 'white', marginBottom: 3,  fontSize:15 }}>Tema</Text>
                    </View>
                </View>


                {/*   linea  -----------------------------------------------------------*/}
                <View
                    style={styles.cat}
                />
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.titleCat}>Avanzado</Text>
                    <Text style={styles.text}>Mantener la pantalla encendida durante el entrenamiento</Text>
                    <Text style={styles.text}>Exportar datos</Text>
                    <Text style={styles.text}>Tema</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.titleCat}>Otros servicios</Text>
                    <Text style={styles.text}>Google Fit</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.titleCat}>Contacto y soporte</Text>
                    <Text style={{ padding:8, backgroundColor: 'purple', borderRadius:4, color:'white', marginBottom:10 }}>Si quieres informar sobre un problema puedes contactarme a través de las siguientes redes sociales. </Text>
                    <Text style={styles.text}>Twitter @serdev_es</Text>
                    <Text style={styles.text}>Instagram @serdev_es</Text>
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
    cat:{
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
        lineHeight:20,
        fontSize: 15,
        color: 'white',
        marginBottom: 10
    },

})




