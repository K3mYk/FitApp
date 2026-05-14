// database/models/Workout.ts

export interface Workout {
  id?: number;          
  title: string;       
  duration: number;     
  date: string;         
  calories?: number;    
  type?: string;        
}