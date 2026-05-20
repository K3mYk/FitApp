import { getDB } from './db';

export const runMigrations = async () => {
  const db = await getDB();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      height REAL,
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

    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      media_url TEXT,
      exercise_type TEXT NOT NULL, -- "cardio" or "strength"
      met_value REAL -- Metabolic Equivalent of Task
    );

    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY,
      name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS exerciseTags (
      exercise_id INTEGER REFERENCES exercises(id),
      tag_id INTEGER REFERENCES tags(id),
      PRIMARY KEY (exercise_id, tag_id)
    );
    
    CREATE TABLE IF NOT EXISTS workoutTemplates (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS workoutTemplateExercises (
      id INTEGER PRIMARY KEY,
      template_id INTEGER REFERENCES workoutTemplates(id),
      exercise_id INTEGER REFERENCES exercises(id),
      sort_order INTEGER NOT NULL,
      target_sets INTEGER
    );

    CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY,
      template_id INTEGER NULL REFERENCES workoutTemplates(id),
      status TEXT NOT NULL,
      schedule_date TEXT ,
      start_time TEXT,
      end_time TEXT,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS workoutExercises (
      id INTEGER PRIMARY KEY,
      workout_id INTEGER REFERENCES workouts(id),
      exercise_id INTEGER REFERENCES exercises(id),
      sort_order INTEGER,
      rpe INTEGER CHECK(rpe BETWEEN 1 AND 10),
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS sets (
    id INTEGER PRIMARY KEY,
    workout_exercise_id INTEGER REFERENCES workoutExercises(id),
    set_number INTEGER NOT NULL,

    weight REAL,
    reps INTEGER,

    distance REAL,

    start_time TEXT,
    end_time TEXT,
    rest_duration_seconds INTEGER,
    is_pr INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS personalRecords(
    id INTEGER PRIMARY KEY,
    exercise_id INTEGER REFERENCES exercises(id),
    set_id INTEGER REFERENCES sets(id),
    record_type TEXT NOT NULL,
    record_value REAL NOT NULL,
    date_achieved TEXT
    );
  `);
};