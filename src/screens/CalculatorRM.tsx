import React, { useCallback, useEffect, useState } from 'react';
import { Table, Row, Rows } from 'react-native-table-component';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window");

export const CalculatorRM = () => {
    const [rm, setRM] = useState<string>()
    const [reps, setReps] = useState<string>()
    const [tableState, setTableState] = useState<any>({
        tableHead: ['Repeticiones', 'Intensidad\n(/%1RM)'],
        tableData: [
            ['1', 'Introduce RM'],
            ['2', 'Introduce RM'],
            ['3', 'Introduce RM'],
            ['4', 'Introduce RM'],
            ['5', 'Introduce RM'],
            ['6', 'Introduce RM'],
            ['7', 'Introduce RM'],
            ['8', 'Introduce RM'],
            ['9', 'Introduce RM'],
            ['10', 'Introduce RM'],
        ]
    })


    const calculateRM = () => {
       if(!rm || !reps)return
       if(Number(reps) > 30)return

        let value = Number(rm);
        let maximumRepetition = value / (1.0278 - 0.0278 * Number(reps));
        setTableState({
            tableHead: ['Repeticiones', 'Intensidad\n(%1RM)'],
            tableData: [
                ['1', maximumRepetition.toFixed(2) + ' kg'],
                ['2', mathFunctionReverse(2,maximumRepetition.toFixed(2)).toFixed(2)+ ' kg'],
                ['3', mathFunctionReverse(3,maximumRepetition.toFixed(2)).toFixed(2)+ ' kg'],
                ['4', mathFunctionReverse(4,maximumRepetition.toFixed(2)).toFixed(2)+ ' kg'],
                ['5', mathFunctionReverse(5,maximumRepetition.toFixed(2)).toFixed(2)+ ' kg'],
                ['6', mathFunctionReverse(6,maximumRepetition.toFixed(2)).toFixed(2)+ ' kg'],
                ['7', mathFunctionReverse(7,maximumRepetition.toFixed(2)).toFixed(2)+ ' kg'],
                ['8', mathFunctionReverse(8,maximumRepetition.toFixed(2)).toFixed(2)+ ' kg'],
                ['9', mathFunctionReverse(9,maximumRepetition.toFixed(2)).toFixed(2)+ ' kg'],
                ['10', mathFunctionReverse(10,maximumRepetition.toFixed(2)).toFixed(2) + ' kg'],
            ]
        })

    }

    
   // const mathFunction = (rep:number, max:string | number) => Number(max) / (1.0278 - 0.0278 * Number(rep));
    const mathFunctionReverse = useCallback((rep:number, max:string | number) => Number(max) * (1.0278 - 0.0278 * Number(rep)),[]);


    return (
        <SafeAreaView style={{ height: '100%', backgroundColor: '#181818' }}>
            <ScrollView>
            <Text style={styles.title}>Calculadora RM</Text>
            <View style={{ marginHorizontal: 24 }}>
                <Text style={{ color: 'white' }}>Se calcula con el método de Gorostiaga (1997)</Text>
            </View>
            <View style={{ display: 'flex', alignItems: 'center', width, height: height }}>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'white' }}>Introduce tu RM</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 15 }}>
                        <TextInput placeholderTextColor='white' keyboardType='numeric'
                            placeholder={'Kilos'} value={rm} style={styles.input} maxLength={10}
                            onChangeText={(text) => setRM(text)}
                        />
                        <TextInput placeholderTextColor='white' keyboardType='numeric'
                            placeholder={'Reps'} value={reps} style={styles.input} maxLength={10}
                            onChangeText={(text) => setReps(text)}
                        />
                    </View>

                    <TouchableOpacity style={{ marginTop: 14 }} onPress={calculateRM}>
                        <View style={{ width: 160, height: 40, backgroundColor: '#663EE3', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white' }}>Calcular RM</Text>
                        </View>

                    </TouchableOpacity>
                    <View style={styles.container}>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#663EE3' }}>
                        <Row data={tableState.tableHead} style={styles.head} textStyle={styles.textHead} />
                        <Rows data={tableState.tableData} textStyle={styles.text} />
                    </Table>
                </View>
                </View>
           
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 27,
        margin: 24
    },
    input: {
        height: 40,
        width: width * 0.4,
        borderWidth: 1,
        borderColor: '#663EE3',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 3,
        color: 'white',
        marginVertical: 5
    },
    container: { flex: 1, paddingTop: 30},
    head: { height: 40, backgroundColor: '#663EE3'},
    textHead: { color:'white', text:'center', textAlign: 'center'},
    text: { margin: 6, color:'white',textAlign: 'center' }
});
