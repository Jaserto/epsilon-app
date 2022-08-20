import React, { useEffect, useState } from 'react'
import { Dimensions, View, Text, ScrollView, Platform, StyleSheet, Alert, RefreshControl } from 'react-native';
import { VictoryBar, VictoryScatter, VictoryLine, VictoryAxis, VictoryChart, VictoryTheme } from "victory-native";
import VictoryCustomTheme from '../utils/styles/VictoryCustomTheme'
import 'react-native-get-random-values'



const { width, height } = Dimensions.get("window");


export const ProfileScreen = ({ navigation }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const data = [
        { quarter: 1, earnings: 100 },
        { quarter: 2, earnings: 150 },
        { quarter: 3, earnings: 200 },
        { quarter: 4, earnings: 30 }
    ];

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
            <View style={{ marginTop: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 35, height: 35, backgroundColor: 'gray', borderRadius: 50, marginRight: 6 }}></View>
                    <View>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize:18 }}>Javier Serna</Text>
                        <Text style={{ color: 'white', fontSize:15 }}>5 Entrenamientos</Text>
                    </View>
                </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <View style={{padding:6, backgroundColor: 'purple', borderRadius: 4, display:'flex', alignItems:'center',  marginBottom: 18,justifyContent:'center'}}>
                <Text style={{ color: 'white', fontSize:16, fontWeight:'bold'}}>Analiza tu progreso</Text>
              </View>
                <View style={{ width: '100%', borderWidth: 1, marginBottom: 30, borderTopWidth:6, borderTopColor:'purple',backgroundColor:'white', borderRadius: 4, paddingHorizontal: 10, padding: 5 }}>
                    <Text style={{ color: 'purple' , fontSize:16}}>Entrenamientos por semana</Text>
                    <VictoryChart width={300} height={220} theme={VictoryCustomTheme} animate={{
                        duration: 500,
                        onLoad: { duration: 300 }
                    }}>
                        <VictoryLine

                            style={{
                                data: { stroke: "purple" },
                                parent: { border: "1px solid #ccc" }
                            }}
                            categories={{ x: ["SQ", "BP", "DL", "PU", "PP"], y: ["20", "50", "100", "150", "200"] }}
                            data={[
                                { x: 1, y: 2 },
                                { x: 2, y: 3 },
                                { x: 3, y: 5 },
                                { x: 4, y: 4 },
                                { x: 5, y: 7 }
                            ]}
                        />
                        <VictoryScatter data={[
                            { x: 1, y: 2 },
                            { x: 2, y: 3 },
                            { x: 3, y: 5 },
                            { x: 4, y: 4 },
                            { x: 5, y: 7 }
                        ]}
                            size={5}
                            style={{
                                data: {
                                    fill: 'purple'
                                }
                            }}
                        />
                    </VictoryChart>
                </View>
                <View style={{ width: '100%', marginBottom: 30, backgroundColor:'white',  borderTopWidth:6, borderTopColor:'purple', borderRadius: 4, paddingHorizontal: 10, padding: 5 }}>
                    <Text style={{ color: 'purple' , fontSize:16, marginBottom:10}}>Mejores levantamientos</Text>
                    <VictoryChart width={300} height={200} theme={VictoryCustomTheme}>
                    <VictoryBar 
                        data={data} 
                        x="quarter" 
                        y="earnings" 
                        categories={{ x: ["SQ", "BP", "DL", "PU"], y: ["20", "50", "100", "150", "200"] }}
                    />
                </VictoryChart>
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
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    }


})



