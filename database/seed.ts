import { getDB } from "./db";
import { EXERCISES_DEAFULT } from "./seed/exercises.seed";
export async function seedDatabase() {
    const db = await getDB();
  const existing = await db.getFirstAsync(
    "SELECT id FROM exercises LIMIT 1"
  );

  if (existing) return;

  for (const ex of EXERCISES_DEAFULT) {
    const result = await db.runAsync(
      `
      INSERT INTO exercises (
        name,
        description,
        exercise_type,
        met_value
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        ex.name,
        ex.description,
        ex.exercise_type,
        ex.met_value,
      ]
    );

    const exerciseId = result.lastInsertRowId;

    // insert tagów itd
  }
}