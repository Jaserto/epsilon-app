import { Exercise } from "./Exercise"
import { Series } from "./Series"

export interface Workout {
    id: number,
    dia: Date,
    fecha: string,
    fechaISO: string,
    title: string,
    tiempo: Date,
    notes: string,
    pr:number,
    totalWeight: number,
    mes: number,
    exercises: Array<ExerciseWorkout>
}

export interface ExerciseWorkout {
    exercise: string,
    idExercise: number,
    series: Array<Serie>,
}

export interface Serie {
    weight: string,
    reps:string,
    exerciseId: number;
}

