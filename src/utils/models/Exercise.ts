 export interface Exercise {
    id: number,
    nombre: string,
    muscularGroup: muscularGroup,
    instrucciones: string
 }

 
 enum muscularGroup {
    Back,
    Chest,
    Arms,
    Legs
}
