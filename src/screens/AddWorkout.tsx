
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, Button, Dimensions, Image, LogBox, Platform, RefreshControl, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet';


const { width, height } = Dimensions.get("window");


export const AddWorkoutScreen = ({ navigation }: any) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

    
    const sheetRef = useRef<BottomSheet>(null);
    const [isOpen, setIsOpen] = useState(true);
    const [notes, setNotes] = useState('');

    const handleSheetChanges = useCallback((index: number) => {
        setIsOpen(true)
        console.log('handleSheetChanges', index);
        bottomSheetRef?.current?.snapToIndex(index);
      }, []);

   // variables
   const snapPoints = useMemo(() => [ '1%','97%'], []);

    const handleSnapPress = useCallback((index) => {
        sheetRef?.current?.snapToIndex(index);
        console.log('gola')
        setIsOpen(true)
        console.log(isOpen)
    },[]);


    return (
        <GestureHandlerRootView style={{flex:1}}>
            
        <View
          /*   scrollEventThrottle={1}
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
            }} */ style={styles.view}>
            <View style={{ marginVertical: 10 }}>
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Añade un nuevo entrenamiento</Text>
            </View>
            <View style={{marginBottom:25}}>
                <Text style={{ color: 'white', marginBottom:12, fontWeight:'bold' }}>INICIO RÁPIDO</Text>
                <TouchableOpacity 
                onPress={()=>handleSheetChanges(1)}
                style={{backgroundColor:'purple', display:'flex', alignItems:'center', padding:5, borderRadius:5}}>
                    <Text style={{ color: 'white' }}>COMENZAR UN ENTRENAMIENTO VACÍO</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginBottom:20}}>
                <Text style={{ color: 'white', marginBottom:15, fontWeight:'bold'}}>MIS PLANTILLAS</Text>
                <Text style={{ color: 'white' }}>Aún no tienes ninguna plantilla personalizada. ¡Haz click en el botón '+' para crear la primera plantilla</Text>
            </View>
            <View style={{marginBottom:50}}>
                <Text style={{ color: 'white', marginBottom:13, fontWeight:'bold'}}>Plantillas de ejemplo</Text>
                <View>
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
           {/*  <BottomSheet /> */}
           <BottomSheet 
               ref={bottomSheetRef}
               snapPoints={snapPoints}
              /*  enablePanDownToClose={true} */
                onClose={() => setIsOpen(false)}
            >
              <View style={{paddingHorizontal:10}}>
          <Text style={{fontWeight:'bold', alignSelf:'center', marginVertical:15}}>⌚ Temporizador</Text>
          <TouchableOpacity 
          style={{backgroundColor:'#663EE3', borderRadius:5, padding:6}}
          onPress={()=>handleSheetChanges(0)}>
            <Text style={{fontWeight:'bold', alignSelf:'center', color:'white'}}>Cerrar</Text>
          </TouchableOpacity>
        <View style={{marginVertical:20}}>
            <Text style={{fontSize:20, color:'#363636', fontWeight:'bold', marginBottom:10}}>Entrenamiento por la mañana</Text>
            <View style={{marginVertical:15}}>
          {/*   <Text style={styles.labelInput}>Notas del entrenamiento</Text> */}
            <TextInput placeholder={'Notas del entrenamiento'} value={notes} style={styles.input}  maxLength={40}/>
            </View>
            <View style={[styles.button, {backgroundColor:'#005DD5'}]}>
                    <Text style={{color:'white', fontWeight:'bold', textAlign:'center'}}>Añadir ejercicio</Text>
                </View>
                <View style={[styles.button, {backgroundColor:'#F21A1A'}]}>
                    <Text style={{color:'white', fontWeight:'bold', textAlign:'center'}}>Cancelar entrenamiento</Text>
                </View>
        </View>
        </View>
            </BottomSheet>
        </View>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    view: {
        /* display: 'flex', */
        flexDirection: 'column',
        backgroundColor: '#111111',
        height,
        width: width,
        padding: 15, 
   
    },
    text: {
        fontSize: 15,
        color: 'white',
        marginBottom: 10
    },
    labelInput: {
        paddingHorizontal: 10,
    },
    button:{
        alignSelf:'center',
        padding:10,
        borderRadius:6,
        width:width*0.6,
        marginBottom:10
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor:'#663EE3',
        borderRadius:5,
        padding: 10,
      },

})


