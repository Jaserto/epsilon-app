import React, { useContext, useEffect, useState } from 'react'
import { Alert, Dimensions, Image, LogBox, Platform, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView, Switch } from 'react-native-gesture-handler'
import * as Keychain from "react-native-keychain";
import { Path, Svg, Circle, Line } from 'react-native-svg';
import CalendarStrip from 'react-native-calendar-strip';
import 'react-native-get-random-values'
import { customAlphabet } from 'nanoid/non-secure';

const { width, height } = Dimensions.get("window");


export const SettingsScreen = ({ navigation }: any) => {


    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);


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
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>Perfil</Text>
                    <View style={styles.spacer}>
                        <Text style={{ color: 'white', marginBottom: 10 }}>Editar</Text>
                    </View>
                </View>
                {/*   linea  -----------------------------------------------------------*/}
                <View
                    style={{
                        width: '100%',
                        borderBottomColor: 'white',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginBottom: 15
                    }}
                />
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>Unidades y localización</Text>
                    <View style={styles.spacer}>
                        <Text style={{ color: 'white', marginBottom: 10 }}>Peso</Text>
                    </View>
                    <View style={styles.spacer}>
                        <Text style={{ color: 'white', marginBottom: 10 }}>Distancia</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            ios_backgroundColor="#3e3e3e"
                        />
                    </View>
                    <View style={styles.spacer}>
                        <Text style={{ color: 'white', marginBottom: 10 }}>Primer día de la semana</Text>
                    </View>
                    <View style={styles.spacer}>
                        <Text style={{ color: 'white', marginBottom: 10 }}>Tamaño</Text>
                    </View>
                </View>
                {/*   linea  -----------------------------------------------------------*/}

                <View
                    style={{
                        width: '100%',
                        borderBottomColor: 'white',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginBottom: 10
                    }}
                />

                <View style={{ marginBottom: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>General</Text>
                    <View style={styles.spacer}>
                        <Text style={{ color: 'white', marginBottom: 3 }}>Mantener la pantalla encendida durante el entrenamiento</Text>
                    </View>
                    <View style={styles.spacer}>
                        <Text style={{ color: 'white', marginBottom: 3 }}>Exportar datos</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            ios_backgroundColor="#3e3e3e"
                        />
                    </View>
                    <View style={styles.spacer}>
                        <Text style={{ color: 'white', marginBottom: 3 }}>Tema</Text>
                    </View>
                </View>


                {/*   linea  -----------------------------------------------------------*/}
                <View
                    style={{
                        width: '100%',
                        borderBottomColor: 'white',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginBottom: 10
                    }}
                />
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 9 }}>Avanzado</Text>
                    <Text style={{ color: 'white', marginBottom: 3 }}>Mantener la pantalla encendida durante el entrenamiento</Text>
                    <Text style={{ color: 'white', marginBottom: 3 }}>Exportar datos</Text>
                    <Text style={{ color: 'white', marginBottom: 3 }}>Tema</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 9 }}>Otros servicios</Text>
                    <Text style={{ color: 'white', marginBottom: 3 }}>Google Fit</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 9 }}>Contacto y soporte</Text>
                    <Text style={{ color: 'white', marginBottom: 3 }}>Informar sobre un problema</Text>
                    <Text style={{ color: 'white', marginBottom: 3 }}>Twitter</Text>
                    <Text style={{ color: 'white', marginBottom: 3 }}>Facebook</Text>
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
    imageProd: {
        width: 33,
        height: 33,

    },
    contendorFechaNombre: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
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
    textHeader: {
        fontSize: 30,
        marginBottom: 15
    },
    h3: {
        fontSize: 30,
        marginBottom: 18,
        color: 'white'
    },
    card: {
        // padding: 10,
        backgroundColor: '#FFEA75',
        elevation: 2,

        borderRadius: 10,
        marginRight: 10,
        shadowColor: "#000",
        shadowRadius: 10,
        shadowOpacity: 0.8,

        height: 200,
        width: 200,
        overflow: "hidden",
    },
    sendButton: {
        backgroundColor: '#DB3F3F',
        width: 45,
        height: 35,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBox: {
        flexDirection: "row",
        backgroundColor: '#fff',
        alignSelf: 'center',
        width: '85%',
        borderRadius: 20,
        padding: 6,
        paddingHorizontal: 14,
        marginBottom: 15,
        marginTop: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,

    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
        borderBottomRightRadius: 25
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    marker: {
        backgroundColor: '#23324F',
        padding: 0,
        borderRadius: 5,
    },
    text: {
        fontSize: 12,
        color: 'white'
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '80%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 30,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    }

})




