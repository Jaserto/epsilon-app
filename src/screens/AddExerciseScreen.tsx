import { View, Text, ScrollView, Platform, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { exercises } from '../utils/exercices/data'
import { Exercise } from '../components/Exercise';



const { width, height } = Dimensions.get("window");



  export const AddExerciseScreen = ({ navigation }: any) => {

    const [myStyle, setMyStyle] = useState(false);

    const [selectedExercises, setSelectedExercises] = useState<any>([])

    const onPressExercise = (exercise:any) => {
      if(selectedExercises.includes(exercise.id)){
        const newListItem =  selectedExercises.filter((exerciseId:any) => exerciseId !== exercise.id)
        console.log('la nueva lista',newListItem)
        return setSelectedExercises(newListItem)
      }
      setSelectedExercises([...selectedExercises, exercise.id])
    }

    console.log(selectedExercises)

    const getSelected = (exercise:any) => selectedExercises.includes(exercise.id)
    

  return (
    <ScrollView
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
   <View  style={{marginVertical:10}}>
    <Text style={{color:'white', fontSize:25, fontWeight:'bold'}}>Ejercicios</Text>
   </View>
   <FlatList
              data={exercises}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Exercise onPress={()=> onPressExercise(item)} selected={getSelected(item)} item={item}/>
              )}
            />
{/*   {exercises.map(({id, nombre, muscularGroup}, index) => (
    <View key={id}>
        <Exercise nombre={nombre} muscularGroup={muscularGroup} />
    </View>
  ))} */}
   <View>
    
   <View style={{width:30, height:30, borderRadius:100, backgroundColor:'#C49CFF', marginRight:10}}></View>
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
myStyle:{
  width:33, height:33, borderRadius:100, backgroundColor:'gray', marginRight:10
}

})
