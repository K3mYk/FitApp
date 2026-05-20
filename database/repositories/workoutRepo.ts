// Ten plik zarządza instancją treningu, zapisanymi ćwiczeniami w jego ramach oraz konkretnymi seriami.
import { getDB } from '../db';

export const workoutRepo = {
  // 1. Rozpoczęcie nowego treningu (może być z szablonu lub pusty)
  startWorkout: async (templateId: number | null, scheduleDate: string, startTime: string) => {
    const db = await getDB();
    const result = await db.runAsync(
      'INSERT INTO workouts (template_id, status, schedule_date, start_time) VALUES (?, ?, ?, ?)',
      [templateId, 'in_progress', scheduleDate, startTime]
    );
    return result.lastInsertRowId;
  },

  // 2. Zakończenie treningu
  finishWorkout: async (workoutId: number, endTime: string, notes: string | null) => {
    const db = await getDB();
    await db.runAsync(
      'UPDATE workouts SET status = ?, end_time = ?, notes = ? WHERE id = ?',
      ['completed', endTime, notes, workoutId]
    );
  },

  // 3. Dodanie ćwiczenia do trwającego treningu
  addExerciseToWorkout: async (workoutId: number, exerciseId: number, sortOrder: number) => {
    const db = await getDB();
    const result = await db.runAsync(
      'INSERT INTO workoutExercises (workout_id, exercise_id, sort_order) VALUES (?, ?, ?)',
      [workoutId, exerciseId, sortOrder]
    );
    return result.lastInsertRowId;
  },

  // 4. Zapisanie konkretnej serii (Set) w ćwiczeniu
  addSet: async (
    workoutExerciseId: number, 
    setNumber: number, 
    weight: number | null, 
    reps: number | null, 
    distance: number | null
  ) => {
    const db = await getDB();
    const result = await db.runAsync(`
      INSERT INTO sets (workout_exercise_id, set_number, weight, reps, distance) 
      VALUES (?, ?, ?, ?, ?)`,
      [workoutExerciseId, setNumber, weight, reps, distance]
    );
    return result.lastInsertRowId;
  },

  // 5. Zapisanie RPE / notatek do danego ćwiczenia w treningu
  updateWorkoutExerciseDetails: async (workoutExerciseId: number, rpe: number, notes: string) => {
    const db = await getDB();
    await db.runAsync(
      'UPDATE workoutExercises SET rpe = ?, notes = ? WHERE id = ?',
      [rpe, notes, workoutExerciseId]
    );
  },

  // 6. Kompletne pobranie historii danego treningu ze wszystkimi seriami
  getWorkoutSummary: async (workoutId: number) => {
    const db = await getDB();
    
    // Pobierz bazowy trening
    const workout = await db.getFirstAsync('SELECT * FROM workouts WHERE id = ?', [workoutId]);
    if (!workout) return null;

    // Pobierz ćwiczenia z tego treningu z dołączonymi nazwami z tabeli exercises
    const exercises: any[] = await db.getAllAsync(`
      SELECT we.id as workout_exercise_id, we.sort_order, we.rpe, we.notes, e.name, e.exercise_type 
      FROM workoutExercises we
      JOIN exercises e ON we.exercise_id = e.id
      WHERE we.workout_id = ?
      ORDER BY we.sort_order ASC
    `, [workoutId]);

    // Dla każdego ćwiczenia pobierz jego serie
    for (let i = 0; i < exercises.length; i++) {
      const sets = await db.getAllAsync(
        'SELECT * FROM sets WHERE workout_exercise_id = ? ORDER BY set_number ASC',
        [exercises[i].workout_exercise_id]
      );
      exercises[i].sets = sets;
    }

    return { ...workout, exercises };
  }
};