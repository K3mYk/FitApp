import { getDB } from '../db';
import { User } from '../models/user';

export const createUser = async (user: User) => {
  const db = await getDB();

  const result = await db.runAsync(
    `INSERT INTO users (height, age, sex)
     VALUES (?, ?, ?)`,
    [user.height, user.age, user.sex]
  );

  return result.lastInsertRowId;
};

export const getUser = async (): Promise<User | null> => {
  const db = await getDB();

  const result = await db.getAllAsync(
    `SELECT * FROM users LIMIT 1`
  ) as User[];

  return result.length > 0 ? result[0] : null;
};

export const updateUser = async (user: User) => {
  const db = await getDB();

  await db.runAsync(
    `UPDATE users
     SET height = ?, age = ?, sex = ?
     WHERE id = ?`,
    [user.height, user.age, user.sex, user.id]
  );
};