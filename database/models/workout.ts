// database/models/Workout.ts

export interface Workout {
  id?: number;    
  template_id: number;
  status: string;
  schedule_date: string;
  start_time: string;
  end_time: string;
  notes: string;      
}
