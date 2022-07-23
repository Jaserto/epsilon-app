import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import { fonts } from '../utils/styles/fonts';
//import { components } from '../utils/styles/components';


const Welcome = () => {
  const navigation = useNavigation();


  return (
    <View style={{ height: '100%', backgroundColor:'#DB3F3F' }}>
         <StatusBar hidden={true} />
      <View style={styles.topContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/images/chanfy-logo.png')}
        />
      </View>
      <View style={styles.bottomContainer}>
       {/*  <Text style={styles.title}>Chanfy</Text> */}
        <Text style={styles.description}>
          Regsitra tus entrenamientos{'\n'}y progresa como nunca antes!
        </Text>
        <Pressable
          style={styles.boton}
          onPress={() => navigation.navigate('Signup' as never)}
        >
          <Text style={{color: '#DB3F3F', fontSize: 16}}>EMPIEZA YA</Text>
        </Pressable>
       
        <Text
          style={styles.description2}
          onPress={() => navigation.navigate('Signin' as never)}
        >
          ¿Ya tienes una cuenta?{' '}
          <Text style={{ fontWeight: 'bold' }}>Iniciar sesión</Text>
        </Text>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  boton: {
    height: 40,
    width: '65%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '12%',
    backgroundColor:'white',
    
  },
  topContainer: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
   /*  backgroundColor: '#FFE1BD', */
    backgroundColor: 'transparent',
  },
  bottomContainer: {
    height: '50%',
    alignItems: 'center',
  },
  logo: {
    marginTop:100,
    width: '55%',
    height: '70%',
    resizeMode: 'contain',
    tintColor:'white'
  },
  //title: { ...fonts.header1, ...{ marginTop: '25%' } },
  description: {
   // ...fonts.body1Light,
    ...{ marginTop: '4%', textAlign: 'center', color: 'white' },
  },
  description2: { 
    fontFamily: 'System',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: 'white',
    
    ...{ marginTop: '2%' } },
  //button: { ...components.button, ...{ marginTop: '12%' } },
});
