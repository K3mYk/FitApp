// Ten plik odpowiada za pobieranie bazy ćwiczeń, którą użytkownik może dodać do swojego treningu.
import { getDB } from '../db';
import { Exercise } from '../models/exercise';

export const exerciseRepo = {
  // Pobieranie wszystkich ćwiczeń
  getAllExercises: async () => {
    const db = await getDB();
    return await db.getAllAsync('SELECT * FROM exercises ORDER BY name ASC');
  },

  // Pobieranie ćwiczenia po ID
  getExerciseById: async (id: number) => {
    const db = await getDB();
    return await db.getFirstAsync('SELECT * FROM exercises WHERE id = ?', [id]);
  },

  // Pobieranie ćwiczeń według tagu (np. "klatka", "nogi")
  getExercisesByTag: async (tagId: number) => {
    const db = await getDB();
    return await db.getAllAsync(`
      SELECT e.* FROM exercises e
      JOIN exerciseTags et ON e.id = et.exercise_id
      WHERE et.tag_id = ?
    `, [tagId]);
  }
};