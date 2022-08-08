import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
  } from 'react-native';
export const  Exercise = ({item, onPress, selected }:any ) =>  {

    

  return (
    <TouchableOpacity
    onPress={onPress}
     style={{marginVertical:10, flexDirection:'row', alignItems:'center', overflow:'hidden', padding:6}}>
        <View style={{width:30, height:30, borderRadius:100, backgroundColor:'gray', marginRight:10, marginLeft:5}}></View>
        <View>
            <Text style={{color:'white', fontWeight:'bold', fontSize:17}}>{item.nombre}</Text>
            <Text style={{color:'white', fontSize:15}}>{item.muscularGroup}</Text>
        </View>
   {selected && <View style={styles.overlay}></View> } 
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    overlay: {
        position:'absolute',
        width:'100%',
        height:'100%',
        backgroundColor: '#C49CFF20',
        borderRadius:4,
        borderWidth:1.5,
        borderColor:'#9650FF'
       
    },

  
  })
  