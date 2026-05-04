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
  `);
};

