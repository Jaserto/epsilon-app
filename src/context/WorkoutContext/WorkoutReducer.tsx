export interface WorkoutState {
    workout: any | null;
    inputsData: any;
    errorMessage: string;
    status: 'not-data' | 'data'
}

/* export type Workout = {
    _id: string | null;
    token: string | null;
} */


type WorkourAction =
    | { type: 'storeData', payload:  { workout: any | null } }
    | { type: 'getData', payload:  { workout: any | null } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'setInputsData', payload: { inputsData: any | null} }
    | { type: 'getInputsData', payload: { inputsData: any | null} }
    | { type: 'addWorkout', payload: { workout:any | null} }
    | { type: 'clearDatabase'}



    export const workoutReducer = (state: any, action: WorkourAction): WorkoutState => {
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
            case 'getData':
                return {
                    ...state,
                    workout: action.payload,
                    errorMessage: '',
                }
            case 'storeData':
                return {
                     ...state,
                    workout: action.payload,
                    errorMessage: '',
                }
            case 'clearDatabase':
                    return {
                        ...state,
                        workout: null,
                }
            case 'setInputsData':
                    return {
                        ...state,
                        inputsData: action.payload,
                }
            case 'getInputsData':
                    return {
                        ...state,
                        inputsData: action.payload,
                }
            default:
                return state;
        }
    }