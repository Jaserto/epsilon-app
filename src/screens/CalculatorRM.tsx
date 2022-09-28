import React, { useEffect, useState } from 'react';

import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

import { StyleSheet, Text, View, SafeAreaView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get("window");

export const CalculatorRM = (props: any) => {
    const [rm, setRM] = useState<string>()
    const [reps, setReps] = useState<string>()
    const [maximum, setMaximum] = useState<number | string>()
    const [tableState, setTableState] = useState<any>({
        tableHead: ['Repeticiones', 'Intensidad\n(/%1RM)'],
        tableData: [
            ['1', '2'],
            ['2', 'b'],
            ['3', '2'],
            ['4', 'b'],
            ['5', 'b'],
            ['6', 'b'],
            ['7', 'b'],
            ['8', 'b'],
            ['9', 'b'],
            ['10', 'b'],
        ]
    })

    useEffect(()=> {

    },[])

    const calculateRM = (number: string, reps: string) => {
       if(!number || !reps)return

        let value = Number(number);
        console.log(value);
        let maximumRepetition = value / (1.0278 - 0.0278 * Number(reps));
    
        console.log(maximumRepetition.toFixed(2))
        setMaximum(maximumRepetition.toFixed(2))
  
     /*    let obj = {
            tableHead: ['Repeticiones', 'Intensidad\n(/%1RM)'],
            tableData: [
                ['1', maximumRepetition.toFixed(2) + ' kg'],
                ['2', mathFunction(2,value).toFixed(2)+ ' kg'],
                ['3', mathFunction(3,value).toFixed(2)+ ' kg'],
                ['4', mathFunction(4,value).toFixed(2)+ ' kg'],
                ['5', mathFunction(5,value).toFixed(2)+ ' kg'],
                ['6', mathFunction(6,value).toFixed(2)+ ' kg'],
                ['7', mathFunction(7,value).toFixed(2)+ ' kg'],
                ['8', mathFunction(8,value).toFixed(2)+ ' kg'],
                ['9', mathFunction(9,value).toFixed(2)+ ' kg'],
                ['10', mathFunction(10,value).toFixed(2) + ' kg'],
            ]
        }
        if(Number(reps)>0){
        obj.tableData[Number(reps)-1][1] =  maximumRepetition.toFixed(2) + ' kg';
        obj.tableData[Number(reps)-1][1] =  maximumRepetition.toFixed(2) + ' kg';
        obj.tableData[Number(reps)-1][1] =  maximumRepetition.toFixed(2) + ' kg';
        obj.tableData[Number(reps)-1][1] =  maximumRepetition.toFixed(2) + ' kg';
        }else{

        } */
      /*   setTableState({}) */


        setTableState(
      /*       obj */
            {
            tableHead: ['Repeticiones', 'Intensidad\n(/%1RM)'],
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

    
    const mathFunction = (rep:number, max:string | number) => Number(max) / (1.0278 - 0.0278 * Number(rep));
    const mathFunctionReverse = (rep:number, max:string | number) => Number(max) * (1.0278 - 0.0278 * Number(rep));


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
                            placeholder={'Kilos'} value={rm} style={styles.input} maxLength={40}
                            onChangeText={(text) => setRM(text)}
                        />
                        <TextInput placeholderTextColor='white' keyboardType='numeric'
                            placeholder={'Reps'} value={reps} style={styles.input} maxLength={40}
                            onChangeText={(text) => setRM(text)}
                        />
                    </View>

                    <TouchableOpacity style={{ marginTop: 14 }} onPress={() => calculateRM('72.5', '3')}>
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
