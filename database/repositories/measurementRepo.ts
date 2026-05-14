import { Measurement } from '../models/measurement';

export const addMeasurement = async (m: Measurement) => {
  const db = await getDB();

  await db.runAsync(
    `INSERT INTO measurements (user_id, weight, waist, hips, date)
     VALUES (?, ?, ?, ?, ?)`,
    [m.user_id, m.weight, m.waist, m.hips, m.date]
  );
};

export const getMeasurements = async (userId: number): Promise<Measurement[]> => {
  const db = await getDB();

  const result = await db.getAllAsync(
    `SELECT * FROM measurements WHERE user_id = ? ORDER BY date DESC`,
    [userId]
  )as Measurement[];

  return result;
};