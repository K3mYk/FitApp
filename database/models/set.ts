export interface Set {
    id?: number;
    workout_exercise_id: number;
    set_number: number;
    weight: number;
    reps: number;
    distance: number;
    start_time: string;
    end_time: string;
    rest_duration_seconds: number;
    is_pr: number;
}
