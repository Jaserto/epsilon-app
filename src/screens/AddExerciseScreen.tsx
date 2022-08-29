import { View, Text, ScrollView, Platform, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useContext, useRef, useState } from 'react'
import { exercises } from '../utils/exercices/data'
import { Exercise } from '../components/Exercise';
import Svg, { Line, Polyline } from 'react-native-svg';
import { WorkoutContext } from '../context/WorkoutContext/WorkoutContext';


const { width, height } = Dimensions.get("window");

export const AddExerciseScreen = ({ navigation }: any) => {
  
  const { getData, workout } = useContext(WorkoutContext);
  const [selectedExercises, setSelectedExercises] = useState<any>([])

  const onPressExercise = (exercise: any) => {
    if (selectedExercises.includes(exercise.id)) {
      const newListItem = selectedExercises.filter((exerciseId: any) => exerciseId !== exercise.id)
      return setSelectedExercises(newListItem)
    }
    setSelectedExercises([...selectedExercises, exercise.id])
  }


  const getSelected = (exercise: any) => selectedExercises.includes(exercise.id)


  return (
    <>
    <View style={styles.view}>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Ejercicios</Text>
      </View>
      <FlatList
        data={exercises}
        style={{ minHeight: height * 0.83 }}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Exercise onPress={() => onPressExercise(item)} selected={getSelected(item)} item={item} />
        )}
      />
   
     
    </View>

    {selectedExercises.length > 0 &&
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'flex-end', justifyContent:'flex-end' }}>
          <TouchableOpacity
                onPress={() => {
                  navigation.replace('AddWorkout', {
                     selectedExercices: selectedExercises,
                  })
              }}
          
          style={{ width: 50, alignItems:'center', justifyContent:'center', display:'flex', height: 50, borderRadius: 100, backgroundColor: '#C49CFF', margin: 20 }}>
            <Svg
              width={30}
              height={30}
              viewBox="0 0 25 25"
              fill="none"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round">
              <Line x1="12" y1="5" x2="12" y2="19" />
              <Line x1="5" y1="12" x2="19" y2="12" />
            </Svg>
          </TouchableOpacity>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#111111',
    height,
    width,
    padding: 15
  },
  myStyle: {
    width: 33, height: 33, borderRadius: 100, backgroundColor: 'gray', marginRight: 10
  }

})
