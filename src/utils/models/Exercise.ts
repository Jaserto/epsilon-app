 export interface Exercise {
    id: number,
    nombre: string,
    muscularGroup:string,
    instrucciones: string
 }

 
 enum muscularGroup {
    Back,
    Chest,
    Arms,
    Legs
}
