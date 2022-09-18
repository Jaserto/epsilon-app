export interface UserState {
    weightType: 'kg' | 'lb'
    distanceType: 'm' | 'yards'
    sizeType: any;
    keepAwakeScreen: boolean;
    errorMessage:string;
/*     status: 'not-data' | 'data' */
}


type UserAction =
    | { type: 'setWeightType', payload: string }
    | { type: 'setDistanceType', payload:  string }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'setKeepAwakeScreen', payload: boolean }
    | { type: 'setSizeType', payload: any }


    export const userReducer = (state: any, action: UserAction): UserState => {
        switch (action.type) {
            case 'addError':
                return {
                    ...state,
                    errorMessage: action.payload,
                }
            case 'removeError':
                return {
                    ...state,
                    errorMessage: ''
                }
            case 'setWeightType':
                return {
                    ...state,
                    weightType: action.payload,
                    errorMessage: '',
                }
            case 'setDistanceType':
                return {
                     ...state,
                    distanceType: action.payload,
                    errorMessage: '',
                }
            case 'setKeepAwakeScreen':
                    return {
                        ...state,
                        keepAwakeScreen: action.payload,
                        errorMessage: ''
                }
            case 'setSizeType':
                    return {
                        ...state,
                        sizeType: action.payload,
                        errorMessage: ''
                }
            default:
                return state;
        }
    }