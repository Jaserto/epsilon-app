import React, { useEffect, useState } from 'react'
import { Dimensions, View, Text, ScrollView, Platform, StyleSheet, Alert, RefreshControl } from 'react-native';
import { VictoryBar, VictoryScatter, VictoryLine,VictoryAxis, VictoryChart, VictoryTheme } from "victory-native";

import 'react-native-get-random-values'



const { width, height } = Dimensions.get("window");


export const ProfileScreen = ({ navigation }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const data = [
        { quarter: 1, earnings: 10000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
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
                        <Text style={{ color: 'white', fontWeight:'bold' }}>Javier</Text>
                        <Text style={{ color: 'white' }}>5 Entrenamientos</Text>
                    </View>
                </View>
            </View>
            <View style={{ marginVertical: 10 }}>
                <Text style={{ color: 'white', marginBottom:18 }}>PANEL DE CONTROL</Text>
                <View style={{width:'100%', height:150, borderWidth:1, marginBottom:30, borderColor:'white', borderRadius:4, paddingHorizontal:10, paddingVertical:5}}>
                    <Text style={{ color: 'white' }}>Entrenamientos por semana</Text>
                    <Text style={{ color: 'white' }}>GRAFICA</Text>
                </View>
          
            </View>
               <View style={styles.container}>
        <VictoryChart width={300} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
        <VictoryChart width={300} height={220} theme={VictoryTheme.material}>
            <VictoryLine 
                
            />
        </VictoryChart>
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



