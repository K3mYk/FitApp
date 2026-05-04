import { calculateFFMI } from "./ffmi";
import { calcWhtr } from "./whtr";
import { calcBodyFatProcentUsNavy } from "./bodyFatProcent";

export function calculateFitScoreBodyScore(bodyFatProcent: number, ffmi: number, whtr: number) {
    // Logic to calculate type A FitScore
    //type A is calculated based on FFMI, body fat % and WHtR
    // Body = 0.5 * BF + 0.3 * FFMI + 0.2 * WHtR
    const score = 0.5 * bodyFatProcent + 0.3 * ffmi + 0.2 * whtr
    return score
    }

export function calculateFitScoreActivityScore() {
    // Logic to calculate type B FitScore
    //type B is calculated based regularity, type of training and general activity over period of time
}

export function calculateFitScorePerformanceScore() {
    // Logic to calculate type C FitScore
    //type C is calculated based on performance from recorded training data
    //based on set goals
}

export function calculateFitScore(userData: any) {
    // for now only body score is included
    // in futer development activity and performance scores will be included
    // also there will be devaid based on goals like cutting/bulking
    const bodyFatProcent = calcBodyFatProcentUsNavy(userData.height, userData.weight, userData.gender, userData.neckCircumference, userData.waistCircumference, userData.hipsCircumference)
    const ffmi = calculateFFMI(userData.weight, userData.height)
    const whtr = calcWhtr(userData.weight, userData.height)
    const bodyScore = calculateFitScoreBodyScore(bodyFatProcent, ffmi, whtr)
    return bodyScore

}