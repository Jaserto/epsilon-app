import React, { createContext, useEffect, useReducer, useState } from 'react';
import { Alert } from 'react-native';
import { workoutReducer, WorkoutState } from './WorkoutReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';


type WorkoutContextProps ={
    errorMessage: string;
    workout: any;
    inputsData: any;
    status: 'not-data' | 'data';
    getData: () => void;
    storeData: ( workout : any) => void;
    setInputsData: ( inputsData: any) => void;
    clearInputs: () => void;
    clearDatabase: () => void;
    removeError: () => void;
}


const workoutInitialState: WorkoutState = {
  workout: null,
  inputsData: null,
  status: 'not-data',
  errorMessage:''
}


export  const WorkoutContext = createContext({} as WorkoutContextProps)



export const WorkoutProvider = ({children}: any) => {

  const  clearDatabase = async() => {
    try {
      await AsyncStorage.removeItem('workout');
      dispatch({ 
        type: 'clearDatabase' 
      });
      return console.log('se Borro todo');
  }
  catch (exception) {
      return false;
  }
  };

  const removeError = () => {
      dispatch({ type: 'removeError'});
  };


  const setInputsData = (inputsData:any) => {
    console.log('Storing Inputs');
    dispatch({ 
      type: 'setInputsData',
      payload: { inputsData }
    });
    return inputsData;
};

/* const getInputsData = () => {
  console.log('getting Inputs');
  dispatch({ 
    type: 'getInputsData',
    
  });
};
 */

  const storeData = async (workout:any) => {
    try {
      const jsonValue = JSON.stringify(workout)
      await AsyncStorage.setItem('workout', jsonValue)
      dispatch({ 
        type: 'storeData',
        payload: { 
          workout
         }
      });
      console.log('Dispatach store data')
      return workout;
    } catch (e) {
      // saving error
      dispatch({ type: 'addError', payload: 'Hubo un problema. ' + e || 'Informacion incorrecta'})
    }
  }

  const clearInputs = async () => {
    try {
      console.log('Storing Inputs');
      dispatch({ 
        type: 'clearInputsData'
      });
     } catch(e) {
       // error reading value
       dispatch({ type: 'addError', payload: 'Hubo un problema. ' + e || 'Informacion incorrecta'})
     }
  }
  
  const getData = async () => {
    try {
     const jsonValue = await AsyncStorage.getItem('workout')
     let res = jsonValue != null ? JSON.parse(jsonValue) : null;
      dispatch({ 
        type: 'getData',
        payload: { workout: res }
      });
      return res
    } catch(e) {
      // error reading value
      dispatch({ type: 'addError', payload: 'Hubo un problema. ' + e || 'Informacion incorrecta'})
    }
  }
  


    const [ state, dispatch ] = useReducer(workoutReducer, workoutInitialState)

    return (
        <WorkoutContext.Provider value ={{
            ...state,
            storeData,
            setInputsData,
            clearInputs,
            getData,
            clearDatabase,
            removeError
        }}>
            {children}
        </WorkoutContext.Provider>

    )
}