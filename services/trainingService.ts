import { workoutRepository } from '../database/repositories/workoutRepository';


export interface ExerciseEntry {
  name: string;
  sets: string;
  reps: string;
  duration?: number;
}

export const trainingService = {
  // Logi w konsoli 
  logStep(step: number, message: string) {
    console.log(`[WORKOUT_STEP_${step}]: ${message}`);
  },

// puste gotowe do robienia 
  placeholderFunction() {
    this.logStep(4, "Placeholder for future.");
  },

  // Logika zapisu jako szablonu (do ponownego użycia)
  async saveAsTemplate(name: string, category: string, exercises: ExerciseEntry[]) {
    this.logStep(5, `Saving plan '${name}' to templates...`);


    // Tu w przyszłości nie wysyła zapytania do bazy, bo nie ma jeszcze stworzonej tabeli na szablony to trzeba zrobic
    console.log("Template saved:", { name, category, exercises });
    this.placeholderFunction();
  },

  // Logika zapisu wykonywanego treningu (do historii)
  async saveFinishedWorkout(category: string, exercises: ExerciseEntry[], totalDuration: number) {
    this.logStep(1, "Saving finished workout session to history.");
    const date = new Date().toISOString().split('T')[0];
    
    const workoutData = {
      date,
      duration: totalDuration,
      title: `${category} Session`,
      note: 'Manual workout'
    };

    const dbExercises = exercises.map(ex => ({
      exercise_name: ex.name,
      sets: parseInt(ex.sets) || 0,
      reps: parseInt(ex.reps) || 0,
      weight: 0,
      note: `Duration: ${ex.duration}s`
    }));

    try {
      await workoutRepository.saveFullWorkout(workoutData, dbExercises);
      this.logStep(3, "Workout saved successfully to DB.");
    } catch (error) {
      console.error("Błąd zapisu treningu:", error);
    }
  }
};