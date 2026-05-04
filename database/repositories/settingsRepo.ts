import { getDB } from "../db";

export const setSetting = async (key: string, value: string) => {
  const db = await getDB();

  await db.runAsync(
    `INSERT INTO settings (key, value)
     VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    [key, value]
  );
};

export const getSetting = async (key: string): Promise<string | null> => {
  const db = await getDB();

  const result = await db.getAllAsync(
    `SELECT value FROM settings WHERE key = ?`,
    [key]
  )as { value: string }[];

  return result.length > 0 ? result[0].value : null;
};