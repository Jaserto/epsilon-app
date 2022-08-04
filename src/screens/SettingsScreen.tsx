import React, { useContext, useEffect, useState } from 'react'
import { Alert, Dimensions, Image, LogBox, Platform, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView, Switch } from 'react-native-gesture-handler'
import 'react-native-get-random-values';

const { width, height } = Dimensions.get("window");

export const SettingsScreen = ({ navigation }: any) => {


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
                        <Text style={styles.text}>Editar</Text>
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
                        <Text style={styles.text}>Primer día de la semana</Text>
                    </View>
                    <View style={styles.spacer}>
                        <Text style={styles.text}>Tamaño</Text>
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
                        <Text style={styles.text}>Mantener la pantalla encendida durante el entrenamiento</Text>
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
                    style={{
                        width: '100%',
                        borderBottomColor: 'white',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginBottom: 10
                    }}
                />
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 9 }}>Avanzado</Text>
                    <Text style={styles.text}>Mantener la pantalla encendida durante el entrenamiento</Text>
                    <Text style={styles.text}>Exportar datos</Text>
                    <Text style={styles.text}>Tema</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 9 }}>Otros servicios</Text>
                    <Text style={styles.text}>Google Fit</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 9 }}>Contacto y soporte</Text>
                    <Text style={styles.text}>Informar sobre un problema</Text>
                    <Text style={styles.text}>Twitter</Text>
                    <Text style={styles.text}>Facebook</Text>
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
        fontSize: 15,
        color: 'white',
        marginBottom: 10
    },

})




