import { Exercise } from "./Exercise";
import { Serie } from "./Serie";

export interface Series {
    id: number,
    reps: number,
    exercise: Exercise,
    weight: number,
    series: Array<Serie>
}

