import { Series } from "./Series"

export interface Workout {
    id: number,
    dia: Date,
    title: string,
    tiempo: Date,
    notes: string,
    pr:number,
    totalWeight: number,
    mes: number,
    exercises: Array<any>
}

