export function calcBodyFatProcentBmi(age: number, height: number, weight: number, gender:string, neckCircumference: number, waistCircumference: number, hipsCircumference: number) {
    const heightMeter = height / 100;
    const bmi = weight / (heightMeter * heightMeter);
    const genderModifier = gender === 'man' ? 1 : 0;
    const bodyFatProcent = -44.988 + (0.503 * age) + (10.689 * genderModifier) + (3.172 * bmi) - (0.026 * bmi * bmi) + (0.182 * bmi * genderModifier) - (0.02 * bmi *age) - (0.05 * (bmi *bmi) *genderModifier) + (0.00021 * (bmi * bmi) * age);

    return bodyFatProcent
}

export function calcBodyFatProcentUsNavy(height: number, weight: number, gender:string, neckCircumference: number, waistCircumference: number, hipsCircumference: number):number {
    const heightMeter = height / 100;
    const bmi = weight / (heightMeter * heightMeter);
    let bodyFatProcent = -1;
    if (gender === 'man') {
         bodyFatProcent = 495 / (1.0324 - 0.19077 * Math.log10(waistCircumference - neckCircumference) + 0.15456 * Math.log10(height)) - 450;
        return bodyFatProcent
    } else if( gender === 'woman') {
         bodyFatProcent = 495 / (1.29579 - 0.35004 * Math.log10(waistCircumference + hipsCircumference - neckCircumference) + 0.22100 * Math.log10(height)) - 450;
        return bodyFatProcent
    }
    return bodyFatProcent
}   

export function calcWeightNoFat(weight: number, bodyFatProcent: number):number {
    let weightNoFat = (weight * bodyFatProcent) / 100
    weightNoFat = weight - weightNoFat
    return weightNoFat
}
// let test = calcBodyFatProcentUsNavy(178, 74, 'man', 35, 88, 99)
// console.log(test)
// npx ts-node utils/utilsBodyFat.ts 
