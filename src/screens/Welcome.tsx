import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import { fonts } from '../utils/styles/fonts';
//import { components } from '../utils/styles/components';


const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View style={{ height: '100%', backgroundColor:'#181818' }}>
         <StatusBar hidden={true} />
      <View style={styles.topContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo2.png')}
        />
      </View>
      <View style={{display:'flex', alignItems:'center', marginBottom:20}}>

      <Text style={{color:'white', marginBottom:20}}>HEALTH & FITNESS NOTES.</Text>
      <View
        style={{
          width:'90%',
          borderBottomColor: 'white',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      </View>
      
      <View style={styles.bottomContainer}>
       {/*  <Text style={styles.title}>Chanfy</Text> */}
        <Text style={styles.description}>
          Registra tus entrenamientos{'\n'}y progresa como nunca antes!
        </Text>
        <Pressable
          style={styles.boton}
          onPress={() => navigation.navigate('Signup' as never)}
        >
          <Text style={{color: '#242424', fontSize: 16, fontWeight:'bold'}}>Empieza ya</Text>
        </Pressable>
       
       {/*  <Text
          style={styles.description2}
          onPress={() => navigation.navigate('Signin' as never)}
        >
          ¿Ya tienes una cuenta?{' '}
          <Text style={{ fontWeight: 'bold' }}>Iniciar sesión</Text>
        </Text> */}
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  boton: {
    height: 33,
    width: '45%',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '12%',
    backgroundColor:'#FFEA75',
    
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
    width: '25%',
    resizeMode: 'contain'
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
