// database/db.ts
import * as SQLite from 'expo-sqlite';

let dbInstance: any = null; 

export const getDB = async () => {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('fitapp.db');
  }
  return dbInstance;
};