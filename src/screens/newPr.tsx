import React, { useContext, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Pressable, StatusBar, SafeAreaView, Dimensions } from 'react-native';

import LottieView from 'lottie-react-native';
import { exercises } from '../utils/exercices/data';
import { BackHandler } from 'react-native';
import { WorkoutContext } from '../context/WorkoutContext/WorkoutContext';

const { width, height } = Dimensions.get("window");

export const NewPr = (props:any) => {

const { workout, getData, clearDatabase, inputsData, setInputsData } = useContext(WorkoutContext);

let animation = useRef<LottieView>(null);
  useEffect(() => {
    console.log(props.route.params.storagePr)
  }, [])

  useEffect(() => {
    const backAction = () => {
      /* setInputsData([]) */
      props.navigation.replace('InicioScreen');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor:'#181818' }}>
         <StatusBar hidden={true} />
       <View style={{ display:'flex', alignItems:'center', justifyContent:'center', width, height: height}}>
       <LottieView 
                            ref={animation}
                            style={{width:300}} 
                            source={require('../assets/677-trophy.json')}
                            autoPlay
                            loop
                    />
        <Text style={{color:'white', fontSize: 23}}>Has conseguido nuevos Record</Text>
        <Text style={{color:'white', fontSize: 25, fontWeight:'bold'}}>Enhorabuena!!</Text>
        <View style={{marginTop:10, padding:20}}>
                <Text style={{color:'white'}}>Estos son los nuevos record que has conseguido en este entrenamiento:</Text>
           {
            props.route.params.storagePr.map((record:any, id:number) => (
                <View key={id} style={{marginTop:10, display:'flex', flexDirection:'row'}}>
                    <Text style={{color:'white', fontWeight:'bold'}}>{exercises.filter((item:any) => item.id === record.exerciseId)[0].nombre} </Text>
                    <Text style={{color:'white'}}>{record.weight} kgs</Text>
                    </View>
            ))
           }
        </View>
       </View>
       
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  
});
