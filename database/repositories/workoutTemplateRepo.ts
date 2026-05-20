// Służy do układania planów, z których użytkownik korzysta wielokrotnie.
import { getDB } from '../db';

export const workoutTemplateRepo = {
  // Tworzenie nowego szablonu
  createTemplate: async (name: string, description: string | null) => {
    const db = await getDB();
    const result = await db.runAsync(
      'INSERT INTO workoutTemplates (name, description) VALUES (?, ?)',
      [name, description]
    );
    return result.lastInsertRowId;
  },

  // Dodawanie ćwiczenia do szablonu
  addExerciseToTemplate: async (templateId: number, exerciseId: number, sortOrder: number, targetSets: number) => {
    const db = await getDB();
    await db.runAsync(
      'INSERT INTO workoutTemplateExercises (template_id, exercise_id, sort_order, target_sets) VALUES (?, ?, ?, ?)',
      [templateId, exerciseId, sortOrder, targetSets]
    );
  },

  // Pobieranie wszystkich szablonów
  getTemplates: async () => {
    const db = await getDB();
    return await db.getAllAsync('SELECT * FROM workoutTemplates');
  },

  // Pobieranie szablonu wraz z listą przypisanych do niego ćwiczeń
  getTemplateWithExercises: async (templateId: number) => {
    const db = await getDB();
    const template = await db.getFirstAsync('SELECT * FROM workoutTemplates WHERE id = ?', [templateId]);
    
    if (!template) return null;

    const exercises = await db.getAllAsync(`
      SELECT wte.id as template_exercise_id, wte.sort_order, wte.target_sets, e.* FROM workoutTemplateExercises wte
      JOIN exercises e ON wte.exercise_id = e.id
      WHERE wte.template_id = ?
      ORDER BY wte.sort_order ASC
    `, [templateId]);

    return { ...template, exercises };
  }
};