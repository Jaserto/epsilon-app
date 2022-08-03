import React, { useEffect, useState } from 'react'
import { Alert, Button, Dimensions, Image, LogBox, Platform, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import 'react-native-get-random-values'

const { width, height } = Dimensions.get("window");


export const AddWorkoutScreen = ({ navigation }: any) => {

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
            <View style={{ marginVertical: 10 }}>
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Añade un nuevo entrenamiento</Text>
            </View>
            <View style={{marginBottom:25}}>
                <Text style={{ color: 'white', marginBottom:12, fontWeight:'bold' }}>INICIO RÁPIDO</Text>
                <TouchableOpacity style={{backgroundColor:'purple', display:'flex', alignItems:'center', padding:5, borderRadius:5}}>
                    <Text style={{ color: 'white' }}>COMENZAR UN ENTRENAMIENTO VACÍO</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginBottom:20}}>
                <Text style={{ color: 'white', marginBottom:15, fontWeight:'bold'}}>MIS PLANTILLAS</Text>
                <Text style={{ color: 'white' }}>Aún no tienes ninguna plantilla personalizada. ¡Haz click en el botón '+' para crear la primera plantilla</Text>
            </View>
            <View style={{marginBottom:20, height:'100%'}}>
                <Text style={{ color: 'white', marginBottom:13, fontWeight:'bold'}}>Plantillas de ejemplo</Text>
                <View>
                    <View style={{ width:width*0.9,borderRadius:5, marginBottom:10,padding:13, borderWidth:1, borderColor:'white'}}>
                        <Text style={{fontWeight:'bold', color:'white', fontSize:16, marginBottom:3}}>Legs</Text>
                        <View>
                            <Text style={styles.text}>3 x Squat</Text>
                            <Text style={styles.text}>3 x Squat</Text>
                            <Text style={styles.text}>3 x Squat</Text>
                        </View>
                    </View>
                    <View style={{ width:width*0.9,borderRadius:5, marginBottom:10,padding:13, borderWidth:1, borderColor:'white'}}>
                        <Text style={{fontWeight:'bold', color:'white', fontSize:16, marginBottom:3}}>Strong 5x5 - Workout A</Text>
                        <View>
                            <Text style={styles.text}>5 x Squat (barbell)</Text>
                            <Text style={styles.text}>5 x Bench Press</Text>
                            <Text style={styles.text}>5 x Deadlift</Text>
                        </View>
                    </View>
                    <View style={{ width:width*0.9,borderRadius:5, marginBottom:10,padding:13, borderWidth:1, borderColor:'white'}}>
                        <Text style={{fontWeight:'bold', color:'white', fontSize:16, marginBottom:3}}>Legs</Text>
                        <View>
                            <Text style={styles.text}>3 x Squat</Text>
                            <Text style={styles.text}>3 x Squat</Text>
                            <Text style={styles.text}>3 x Squat</Text>
                        </View>
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
    text: {
        fontSize: 15,
        color: 'white',
        marginBottom: 10
    },


})


