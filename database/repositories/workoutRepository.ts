import { getDB } from '../db';

export const workoutRepository = {
  // Dodaliśmy typowanie parametrów (workout: any, exercises: any[]), aby usunąć błędy
  async saveFullWorkout(workout: any, exercises: any[]) {
    const db = await getDB();
    
    const result = await db.runAsync(
      'INSERT INTO workouts (date, duration, title, note) VALUES (?, ?, ?, ?)',
      [workout.date, workout.duration, workout.title, workout.note]
    );

    const workoutId = result.lastInsertRowId;

    for (const ex of exercises) {
      await db.runAsync(
        'INSERT INTO workout_exercises (workout_id, exercise_name, sets, reps, weight) VALUES (?, ?, ?, ?, ?)',
        [workoutId, ex.exercise_name, ex.sets, ex.reps, ex.weight]
      );
    }
    return workoutId;
  },

  async getWorkoutsByDate(date: string) {
    const db = await getDB();
    return await db.getAllAsync('SELECT * FROM workouts WHERE date = ?', [date]);
  }
};