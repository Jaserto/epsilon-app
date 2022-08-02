import { Exercise } from "./Exercise";

export interface Series {
    id: number,
    reps: number,
    exercise: Exercise,
    weight: number,
    series: Array<Serie>
}

interface Serie {
    reps:number,
    weight:number,
}