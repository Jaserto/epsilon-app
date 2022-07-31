import { Exercise } from "./Exercise";

export interface Series {
    id: number,
    reps: number,
    exercise: Exercise,
    weight: number,
    series: Array<any>
}
