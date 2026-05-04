import { getCurrentUserId, setCurrentUserId } from "./settingsService";
import { createUser } from "../database/repositories/userRepo";
import { addMeasurement } from "../database/repositories/measurementRepo";

export const handleFormSubmit = async (form:any) => {
  let userId = await getCurrentUserId();

  // 1. jeśli nie ma usera → tworzymy
  if (!userId) {
    userId = await createUser({
      height: form.height,
      weight: form.weight,
      age: form.age,
      sex: form.sex,
    });

    userId && (await setCurrentUserId(userId));
  }
  if (userId){
  await addMeasurement({
    user_id: userId,
    weight: form.weight,
    waist: form.waist,
    hips: form.hips,
    neck: form.neck,
    date: new Date().toISOString(),
  });}
  tests();
};

function tests(){
    console.log("test");
}