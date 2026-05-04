import { getSetting } from "../database/repositories/settingsRepo";
import { setSetting } from "../database/repositories/settingsRepo";


export const getCurrentUserId = async (): Promise<number | null> => {
  const id = await getSetting("user_id");
  return id ? Number(id) : null;
};


export const setCurrentUserId = async (id: number) => {
  await setSetting("user_id", String(id));
};