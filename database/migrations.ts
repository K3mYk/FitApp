import { getDB } from './db';

export const runMigrations = async () => {
  const db = await getDB();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      height REAL,
      weight REAL,
      age INTEGER,
      sex TEXT
    );

    CREATE TABLE IF NOT EXISTS measurements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      weight REAL,
      waist REAL,
      hips REAL,
      neck REAL,
      date TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      duration INTEGER NOT NULL,
      title TEXT,
      note TEXT
    );

    CREATE TABLE IF NOT EXISTS workout_exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      workout_id INTEGER,
      exercise_name TEXT NOT NULL,
      sets INTEGER,
      reps INTEGER,
      weight REAL,
      FOREIGN KEY(workout_id) REFERENCES workouts(id) ON DELETE CASCADE
    );
  `);
};