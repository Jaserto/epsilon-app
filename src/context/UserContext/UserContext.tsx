import React, { createContext, useReducer } from 'react';
import { userReducer, UserState } from './UserReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';


type UserContextProps = {
    errorMessage: string;
    weightType: 'kg' | 'lb'
    distanceType: 'm' | 'yards'
    keepAwakeScreen: boolean;
    sizeType: any;
    setWeightType: (weightType: string) => void;
    setDistanceType: (distanceType: string) => void;
    setKeepAwakeScreen: (keepAwakeScreen: boolean) => void;
    removeError: () => void;
}


const userInitialState: UserState = {
    weightType: 'kg',
    distanceType: 'm',
    keepAwakeScreen: true,
    sizeType: 'lg',
    errorMessage: ''
}


export const UserContext = createContext({} as UserContextProps)

export const UserProvider = ({children}: any) => {


    const removeError = () => {
        dispatch({ type: 'removeError' });
    };


    const setWeightType = (weightType: string) => {
        try {
            console.log('Storing weightType');
            dispatch({
                type: 'setWeightType',
                payload: weightType
            });
            return weightType;
        } catch (e) {
            // saving error
            dispatch({ type: 'addError', payload: 'Hubo un problema. ' + e || 'No se pudo cambiar la configuración.' })
        }
    };

    const setDistanceType = (distanceType: string) => {
        console.log('Storing distanceType');
        try {
            dispatch({
                type: 'setDistanceType',
                payload: distanceType
            });
            return distanceType;
        } catch (e) {
            // saving error
            dispatch({ type: 'addError', payload: 'Hubo un problema. ' + e || 'No se pudo cambiar la configuración.' })
        }
    };

    const setKeepAwakeScreen = (keepAwakeScreen: boolean) => {
        console.log('Storing setKeepAwakeScreen');
        try {
            dispatch({
                type: 'setKeepAwakeScreen',
                payload: keepAwakeScreen
            });
            return keepAwakeScreen;
        } catch (e) {
            // saving error
            dispatch({ type: 'addError', payload: 'Hubo un problema. ' + e || 'No se pudo cambiar la configuración.' })
        }

    };






    const [state, dispatch] = useReducer(userReducer, userInitialState)

    return (
        <UserContext.Provider value={{
            ...state,
            setWeightType,
            setKeepAwakeScreen,
            setDistanceType,
            removeError
        }}>
            {children}
        </UserContext.Provider>

    )
}