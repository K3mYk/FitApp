import { addMeasurement, getMeasurements } from "../database/repositories/measurementRepo";
import { createUser } from "../database/repositories/userRepo";
import { getCurrentUserId, setCurrentUserId } from "./settingsService";

export const handleFormSubmit = async (form:any) => {
  let userId = await getCurrentUserId();

  // 1. jeśli nie ma usera → tworzymy
  if (!userId) {
    userId = await createUser({
      height: form.height,
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
  if (userId){
    tests();
    const measurements = await getMeasurements(userId);
    console.log(measurements);
  }
};

function tests(){
    console.log("test");
}